const {SchemaError, UserInputError} = require('apollo-server');
const {SyncedLyric, SynchronizationData} = require('./orm');
const {getDisplayLyrics, getProcessedLyrics, geniusSearch, geniusSong} = require('./genius_data_fetcher.js')
const {youtubeSearch, youtubeVideo} = require('./google_data_fetcher')
const graphqlFields = require('graphql-fields');

const Sequelize = require('sequelize')
const Op = Sequelize.Op
const resolvers = {
  Mutation: {
    async postSyncedLyrics(parent, args, context, info) {
      SynchronizationData.count({where: {youtubeID: args.youtubeID, geniusID: args.geniusID}})
        .then(async (count) => {
          //no sync data instance, so create one with some meta data
          if (count === 0) {
            const metaData = geniusSong(args.geniusID)
            await SynchronizationData.create({youtubeID: args.youtubeID, geniusID: args.geniusID, artistName: metaData.artistName, songName: metaData.songName}).catch((error) => {throw new SchemaError(error)})
            await SynchronizationData.sync()
          }
          args.syncedLyrics.forEach(async (row) => {
            row.forEach(async (syncedLyric) => {
              await SyncedLyric.create({...syncedLyric, youtubeID: args.youtubeID, geniusID: args.geniusID}).catch((error) => {throw new SchemaError(error)})
            })
          })
          await SyncedLyric.sync()
        });
    },
  },
  Query: {
    async synchronizationSearch(parent, args, context, info) {
      const searchResults = SynchronizationData.findAll({
        where: {
          artistName: {
            [Op.like]: `%${args.query}%`
          },
          songName: {
            [Op.like]: `%${args.query}%`
          }
        }
      })
        .catch(error => console.log(error))
      return searchResults
    },
    async syncedLyrics(parent, args, context, info) {
      await SyncedLyric.findAll({
        where: {
          geniusID: args.geniusID,
          youtubeID: args.youtubeID
        },
        order: [
          'time'
        ]
      })
        .catch(error => {
          console.log(error)
        })
      //return (syncedLyrics.map(syncedLyric => syncedLyric.dataValues))
    },
    async geniusSearchResults(parent, args, context, info) {
      return await geniusSearch(args.query);
    },

    async geniusSongData(parent, args, context, info) {
      return await geniusSong(args.id)
    },
    async youtubeVideoData(parent, args, context, info) {
      //some info needs to be checked through the youtube api (such as duration, so pass the params to the youtubeVideo which will check if a youtube video call is necessary)
      const fields = graphqlFields(info)
      if (args.url) {
        const response = await youtubeVideo(args.url, fields)
        if (!response) {
          throw new UserInputError("Not a valid YouTube URL")
        }
        return response
      }
      else if (args.id) {
        const response = youtubeVideo(`https://www.youtube.com/watch?v=${args.id}`, fields)
        if (!response) {
          throw new UserInputError("Not a valid YouTube ID")
        }
        return response
      }
    },
    async youtubeSearchResults(parent, args, context, info) {
      //check if supplied was youtube url
      const youtubeVideoData = await youtubeVideo(args.query)

      if (youtubeVideoData) {
        return [youtubeVideoData]
      }
      else {
        return await youtubeSearch(args.query)
      }
    },
    async processedLyrics(parent, args, context, info) {
      return await getProcessedLyrics(args.id)
    },
    async displayLyrics(parent, args, context, info) {
      return await getDisplayLyrics(args.id)
    },
    async findSynchronizationData(parent, args, context, info) {
      //check if sync exists
      const syncData = await SynchronizationData.findOne({
        where: {
          geniusID: args.geniusID
        },
      })
        .catch(error => console.log(error))
      if (!syncData) {
        throw new SchemaError("No lyric synchronization for this video exists.");
      }
      else {
        return syncData.youtubeID
      }
    }
  }
};
module.exports = resolvers;
