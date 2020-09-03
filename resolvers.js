const { SchemaError, UserInputError } = require('apollo-server');
const { SyncedLyric, SynchronizationData, User, CachedLyrics, GameStats } = require('./orm');
const {
  Sequelize: { literal },
} = require('sequelize');
const {
  getDisplayLyrics,
  getProcessedLyrics,
  geniusSearch,
  geniusSong,
  getWordCount,
} = require('./genius_data_fetcher.js');
const { youtubeSearch, youtubeVideo } = require('./youtube_data_fetcher');

const verifyUser = require('./google_authenticator');

//const verifyUser = () => process.env.MY_GOOGLE_ID;
//require('dotenv').config();

const graphqlFields = require('graphql-fields');
const resolvers = {
  SynchronizationData: {
    async searchResult(parent) {
      return {
        imgUrl: parent.imgUrl,
        bottomText: parent.songName,
        centerText: `Created by: ${parent.userName}`,
        topText: parent.artistName,
        forwardingUrl: `/play/${parent.userName}/${parent.youtubeID}/${parent.geniusID}`,
        duration: parent.endTime - parent.startTime,
        createdAt: parent.createdAt
      };
    },
  },
  UserData: {
    async synchronizations(parent) {
      return await SynchronizationData.findAll({ where: { userName: parent.userName } });
    },
    async gameStats(parent) {
      return await GameStats.findAll({ where: { playerUserName: parent.userName } });
    },
  },
  GameStats: {
    async searchResult(parent) {
      //fetch cached metadata (guaranteed to exist as metadata is cached when the synchronization
      //is created)
      const { imgUrl, songName, artistName, startTime, endTime, createdAt } = await SynchronizationData.findOne({
        where: { userName: parent.creatorUserName, youtubeID: parent.youtubeID, geniusID: parent.geniusID },
      });
      return {
        imgUrl,
        bottomText: songName,
        topText: artistName,
        forwardingUrl: `/play/${parent.creatorUserName}/${parent.youtubeID}/${parent.geniusID}`,
        duration: endTime - startTime,
        centerText: `${parent.wordsPerMinute}WPM / ${parent.accuracy}%`,
        createdAt,
      };
    },
  },
  SearchResult: {
    //this class is a generic classifier for createdBy dates. I implemented this classifier type 
    //that returns a dateClassifier type because I need to classify multiples tuples 
    //for instance GameStats and SynchronizationData in the profile page (your game history)
    //and created synchronizations respectively 
    async dateClassifier(parent) {
      const today = new Date();
      const supplied = new Date(parent.createdAt);
      const diffTime = Math.abs(today - supplied);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
      switch(diffDays){
        case(0): 
          debugger;
          return {dateClassified: 'TODAY'}
        case(1): 
          debugger;
          return {dateClassified: 'YESTERDAY'}
        case(x < 7):
          debugger;
          return {dateClassified: 'THIS_WEEK'} 
        default: 
          debugger;
          return {dateClassified: 'FURTHER_BACK'}
      }
    },
  },
  Mutation: {
    async postSyncedLyrics(parent, args, context, info) {
      const { youtubeID, geniusID, startTime, endTime, tokenId } = args.synchronizationData;
      const googleID = await verifyUser(tokenId);
      const { userName } = await User.findOne({ attributes: ['userName'], where: { googleID } });
      return await SynchronizationData.count({
        where: { youtubeID, geniusID, userName },
      })
        .then(async (count) => {
          //no sync data instance, so create one with some meta data
          if (count === 0) {
            const { artistName, songName, imgUrl } = await geniusSong(geniusID);
            await SynchronizationData.create({
              youtubeID,
              geniusID,
              userName,
              startTime,
              endTime,
              artistName,
              songName,
              imgUrl,
            });
          }
          args.syncedLyrics.forEach(async (row) => {
            row.forEach(async (syncedLyric) => {
              await SyncedLyric.create({
                ...syncedLyric,
                youtubeID,
                geniusID,
                userName,
              });
            });
          });
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    },
    async createUser(parent, args, context, info) {
      const googleID = await verifyUser(args.tokenId);
      //check if user with that googleID already exists
      const user = await User.findOne({ where: { googleID } });
      if (!user) {
        try {
          await User.create({
            googleID,
            userName: args.userName,
          });
        } catch (error) {
          console.log(error);
        }
        return true;
      }
      return false;
    },
    async postGameStats(parent, args, context, info) {
      //get the googleID of the player who sent these stats
      const googleID = await verifyUser(args.gameStats.tokenId);

      const { userName: playerUserName } = await User.findOne({
        attributes: ['userName'],
        where: { googleID },
      });

      const { youtubeID, geniusID } = args.gameStats;

      //find the start and end time of this video to calculate the wpm
      const { startTime, endTime } = await SynchronizationData.findOne({
        attributes: ['startTime', 'endTime'],
        where: { userName: playerUserName, youtubeID, geniusID },
      });

      //approximate words by dividing characters by 5 (accounts for longer and shorter words)
      const totalWordsTyped = Math.floor(args.gameStats.totalCharacters / 5);

      //divide by the total interval and then convert seconds to minutes
      const wordsPerMinute = Math.floor((totalWordsTyped / (endTime - startTime)) * 60);

      const wordCount = await getWordCount(geniusID);

      //accuracy is words typed divided by total words
      const accuracy = Math.floor((totalWordsTyped / wordCount) * 100);
      await GameStats.create({
        playerUserName,
        creatorUserName: args.gameStats.creatorUserName,
        accuracy,
        wordsPerMinute,
        geniusID,
        youtubeID,
      }).catch((error) => {
        console.log(error);
        return false;
      });
      return true;
    },
  },
  Query: {
    async syncedLyrics(parent, args, context, info) {
      const matchingLyrics = await SyncedLyric.findAll({
        where: args,
        order: ['time'],
      });
      if (!matchingLyrics || !matchingLyrics.length) {
        throw new SchemaError('None found');
      }

      const endTime = matchingLyrics[matchingLyrics.length - 1].time;
      var toReturn = new Array(Math.ceil(endTime / 3)).fill(0).map(() => new Array(0).fill(0));
      matchingLyrics.forEach((syncedLyric) => {
        //get the bucket by dividing time by 3 (as each bucket has all times in interval of 3)
        const bucket = Math.floor(syncedLyric.time / 3);
        toReturn[bucket].push(syncedLyric);
      });
      var firstNonEmptyIndex = 0;
      while (firstNonEmptyIndex < toReturn.length && !toReturn[firstNonEmptyIndex][0]) {
        firstNonEmptyIndex++;
      }
      //remove empty arrays in the start
      toReturn = toReturn.slice(firstNonEmptyIndex);

      //add horizontalOffsetPercentages based on the number of elements in each
      toReturn = toReturn.map((bucket) => {
        return bucket.map((syncedLyric, index) => {
          syncedLyric.horizontalOffsetPercentage = (100 / bucket.length) * index;
          return syncedLyric;
        });
      });
      return toReturn;
    },
    async geniusSearchResults(parent, args, context, info) {
      return await geniusSearch(args.query);
    },
    async geniusSongData(parent, args, context, info) {
      return await geniusSong(args.id);
    },
    async youtubeVideoData(parent, args, context, info) {
      //some info needs to be checked through the youtube api (such as duration,
      //so pass the params to the youtubeVideo which will check if a youtube video call is necessary)
      const fields = graphqlFields(info);
      if (args.url) {
        const response = await youtubeVideo(args.url, fields);
        if (!response) {
          throw new UserInputError('Not a valid YouTube URL');
        }
        return response;
      } else if (args.id) {
        const response = youtubeVideo(`https://www.youtube.com/watch?v=${args.id}`, fields);
        if (!response) {
          throw new UserInputError('Not a valid YouTube ID');
        }
        return response;
      }
    },
    async youtubeSearchResults(parent, args, context, info) {
      //check if supplied was youtube url
      const youtubeVideoData = await youtubeVideo(args.query);

      if (youtubeVideoData) {
        return [youtubeVideoData];
      } 
      else {
        const results = await youtubeSearch(args.query);
        return results.map((searchResult) => {
          searchResult.forwardingUrl = `/sync/${searchResult.id}/${args.geniusID}`
          return searchResult
        })
      }
    },
    async processedLyrics(parent, args, context, info) {
      const response = await getProcessedLyrics(args.id);
      return response;
    },
    async displayLyrics(parent, args, context, info) {
      return await getDisplayLyrics(args.id);
    },
    async synchronizationData(parent, args, context, info) {
      var queryID = null;
      const { geniusID, youtubeID } = args;
      //check how we should go about querying (or if an id was even supplied)

      if (geniusID) {
        queryID = { geniusID };
      } else if (youtubeID) {
        queryID = { youtubeID };
      } else {
        return null;
      }

      const syncData = await SynchronizationData.findAll({
        where: queryID,
      });
      if (!syncData || !syncData.length) {
        throw new SchemaError('None found');
      }

      const fields = graphqlFields(info);
      if (fields.wordCount) {
        //if requested, append wordCount to each request
        return Promise.all(
          syncData.map(async (sd) => {
            const wordCount = await getWordCount(sd.geniusID);
            return { ...sd, wordCount };
          })
        );
      }
      return syncData;
    },
    async userData(parent, args, context, info) {
      var user;
      if (args.userName) {
        user = await User.findOne({ where: { userName: args.userName } });
      } else if (args.tokenId) {
        const googleID = await verifyUser(args.tokenId);
        user = await User.findOne({ where: { googleID } });
      } else {
        throw new SchemaError('Username or tokenID not submitted');
      }

      if (!user) {
        return { existsInDB: false };
      }
      return { ...user, existsInDB: true };
    },
    async userNameTaken(parent, args, context, info) {
      const user = await User.findOne({
        where: { userName: args.userName },
      });
      return user ? true : false;
    },
    async gameStats(parent, args, context, info) {
      //extract the youtubeID, geniusID and the creator of this synchronization (which can be used to find the sync)
      const { youtubeID, geniusID, creatorUserName } = args;
      return await GameStats.findAll({
        where: { youtubeID, geniusID, creatorUserName },
        order: [['wordsPerMinute', 'DESC']],
        limit: 8,
      });
    },
    async mostPlayed(parent, args, context, info) {
      //join all syncData relations with instances of gameStats, and sort by the number of gamestats in descending order
      //(the first element will be the most played)

      const response = await SynchronizationData.findAll({
        where: { geniusID: '5367420' },
        attributes: [
          [
            literal(
              `(SELECT COUNT(*)
               FROM GameStats
               where GameStats.geniusID = SynchronizationData.geniusID
               and GameStats.youtubeID = SynchronizationData.youtubeID
               and GameStats.creatorUserName = SynchronizationData.userName
               )`
            ),
            'GameStatsCount',
          ],
        ],
        order: [[literal('GameStatsCount'), 'DESC']],
      });
      return response;
    },
  },
};
module.exports = resolvers;
