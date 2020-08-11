const { SchemaError, UserInputError } = require('apollo-server');
const { SyncedLyric, SynchronizationData, User } = require('./orm');
const {
  getDisplayLyrics,
  getProcessedLyrics,
  geniusSearch,
  geniusSong,
} = require('./genius_data_fetcher.js');
const { youtubeSearch, youtubeVideo } = require('./youtube_data_fetcher');
const verifyUser = require('./google_authenticator');
//const verifyUser = () => '105395086988085655499'
const graphqlFields = require('graphql-fields');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const resolvers = {
  Mutation: {
    async postSyncedLyrics(parent, args, context, info) {
      const {
        youtubeID,
        geniusID,
        startTime,
        endTime,
        tokenId,
      } = args.synchronizationData;
      const googleID = await verifyUser(tokenId);
      await SynchronizationData.count({
        where: { youtubeID, geniusID, googleID },
      })
        .then(async (count) => {
          //no sync data instance, so create one with some meta data
          if (count === 0) {
            const { artistName, songName, imgUrl} = await geniusSong(geniusID);
            await SynchronizationData.create({
              youtubeID,
              geniusID,
              googleID,
              startTime,
              endTime,
              artistName,
              songName,
            });
            await SynchronizationData.sync();
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
          await SyncedLyric.sync();
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
        await User.create({
          googleID,
          userName: args.userName,
        });
        return true;
      }
      return false;
    },
  },
  Query: {
    async synchronizationSearch(parent, args, context, info) {
      const searchResults = SynchronizationData.findAll({
        where: {
          artistName: {
            [Op.like]: `%${args.query}%`,
          },
          songName: {
            [Op.like]: `%${args.query}%`,
          },
        },
      }).catch((error) => console.log(error));
      return searchResults;
    },
    async syncedLyrics(parent, args, context, info) {
      const matchingLyrics = await SyncedLyric.findAll({
        where: args,
        order: ['time'],
      });
      if (!matchingLyrics || !matchingLyrics.length) {
        throw new SchemaError('None found');
      }

      const endTime = matchingLyrics[matchingLyrics.length - 1].time;
      var toReturn = new Array(Math.ceil(endTime / 3))
        .fill(0)
        .map(() => new Array(0).fill(0));
      matchingLyrics.forEach((syncedLyric) => {
        //get the bucket by dividing time by 3 (as each bucket has all times in interval of 3)
        const bucket = Math.floor(syncedLyric.time / 3);
        toReturn[bucket].push(syncedLyric);
      });
      var firstNonEmptyIndex = 0;
      while (
        firstNonEmptyIndex < toReturn.length &&
        !toReturn[firstNonEmptyIndex][0]
      ) {
        firstNonEmptyIndex++;
      }
      //remove empty arrays in the start
      toReturn = toReturn.slice(firstNonEmptyIndex);

      //add horizontalOffsetPercentages based on the number of elements in each
      toReturn = toReturn.map((bucket) => {
        return bucket.map((syncedLyric, index) => {
          syncedLyric.horizontalOffsetPercentage =
            (100 / bucket.length) * index;
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
        const response = youtubeVideo(
          `https://www.youtube.com/watch?v=${args.id}`,
          fields
        );
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
      return await getProcessedLyrics(args.id);
    },
    async displayLyrics(parent, args, context, info) {
      return await getDisplayLyrics(args.id);
    },
    async synchronizationData(parent, args, context, info) {
      var queryID = null;
      var fields = graphqlFields(info);
      delete fields.__typename;

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
      } else {
        return syncData;
      }
    },
    async signedInUser(parent, args, context, info) {
      const googleID = await verifyUser(args.tokenId);
      const user = await User.findOne({ where: { googleID } });
      if (!user) {
        return { existsInDB: false };
      }
      var toReturn = {userName: user.userName, existsInDB: true }

      //check if synchronizations are required (expensive call and only required on the profile page)
      const fields = graphqlFields(info);
      if (fields.synchronizations){
        //find the synchronizations
        const cachedSynchronizations = SynchronizationData.findAll({where:  {googleID}})
        const synchronizations = cachedSynchronizations.map(synchronization => {
          return {}
        })
      }
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
