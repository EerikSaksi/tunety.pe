const { SchemaError, UserInputError } = require('apollo-server');

const { SyncedLyric, SynchronizationData, User, CachedLyrics, GameStats } = require('./orm');
const { getDisplayLyrics, getProcessedLyrics, geniusSearch, geniusSong } = require('./genius_data_fetcher.js');
const { youtubeSearch, youtubeVideo } = require('./youtube_data_fetcher');

//const verifyUser = require('./google_authenticator');
const { my_google_id } = require('./auth');

const verifyUser = () => {
  return my_google_id;
};
const graphqlFields = require('graphql-fields');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const resolvers = {
  Mutation: {
    async postSyncedLyrics(parent, args, context, info) {
      const { youtubeID, geniusID, startTime, endTime, tokenId } = args.synchronizationData;
      const googleID = await verifyUser(tokenId);
      return await SynchronizationData.count({
        where: { youtubeID, geniusID, googleID },
      })
        .then(async (count) => {
          //no sync data instance, so create one with some meta data
          if (count === 0) {
            const { artistName, songName, imgUrl } = await geniusSong(geniusID);
            await SynchronizationData.create({
              youtubeID,
              geniusID,
              googleID,
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
                googleID,
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
      const googleID = await verifyUser(tokenId);

      //get the googleID of the user who created this sync
      const { googleID: creatorGoogleId } = User.findOne({ where: { userName: args.gameStats.userName } });

      //find the start and end time of this video to calculate the wpm
      const {youtubeID, geniusID} = args
      const {startTime, endTime} = SynchronizationData.findOne({attributes: ['startTime', 'endTime'], where: {googleID: creatorGoogleId, youtubeID, geniusID}})

      //find the total wordCount which can be used to calculate accuracy 
      const {wordCount} = CachedLyrics.findOne({attributes: ['wordCount'], where: {geniusID}})
      await GameStats.create({
        googleID,
        ...args.gameStats,
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
      //some info needs to be checked through the youtube api (such as duration, so pass the params to the youtubeVideo which will check if a youtube video call is necessary)
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
      } else {
        return await youtubeSearch(args.query);
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
      //wordcount hasnt been cached, run processedLyrics which caches wordcount
      const fields = graphqlFields(info);
      if (fields.wordCount) {
        return syncData.map(async (sd) => {
          const count = await CachedLyrics.count({ where: { geniusID: sd.geniusID } });
          //if the wordCount has not been cached, fetch and process the lyrics (lyrics and wordCount will be added to the cache)
          if (!count) {
            await getProcessedLyrics(sd.geniusID);
          }
          const { wordCount } = await CachedLyrics.findOne({ attributes: ['wordCount'], where: { geniusID: sd.geniusID } });
          return { ...sd.dataValues, wordCount };
        });
      }
      return syncData;
    },
    async signedInUser(parent, args, context, info) {
      var googleID;
      if (args.userName) {
        //try find googleID
        const foundUser = await User.findOne({ where: { userName: args.userName } });

        //if not found, userName does not exist, so return false
        if (!foundUser) {
          return { existsInDB: false };
        }
        //googleID exists so set it to vars value
        else {
          googleID = foundUser.googleID;
        }
      } else if (args.tokenId) {
        googleID = await verifyUser(args.tokenId);
      } else {
        throw new SchemaError('Username or tokenID not submitted');
      }

      const user = await User.findOne({ where: { googleID } });
      if (!user) {
        return { existsInDB: false };
      }

      //check if synchronizations are required (expensive call and only required on the profile page)
      const fields = graphqlFields(info);
      if (fields.synchronizations !== undefined) {
        const synchronizations = await SynchronizationData.findAll({
          where: { googleID },
        });
        return { synchronizations, ...user, existsInDB: true };
      }
      return { userName: user.userName, existsInDB: true };
    },
    async userNameTaken(parent, args, context, info) {
      const user = await User.findOne({
        where: { userName: args.userName },
      });
      return user ? true : false;
    },
  },
};
module.exports = resolvers;
