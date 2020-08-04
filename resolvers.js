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
      const {youtubeID, geniusID} = args.synchronizationData
      try {
        debugger
        SynchronizationData.count({where: {youtubeID, geniusID}})
          .then(async (count) => {
            //no sync data instance, so create one with some meta data
            if (count === 0) {
              const {artistName, songName} = await geniusSong(geniusID)
              await SynchronizationData.create({...args.synchronizationData, artistName, songName})
              await SynchronizationData.sync()
            }
            args.syncedLyrics.forEach(async (row) => {
              row.forEach(async (syncedLyric) => {
                await SyncedLyric.create({...syncedLyric, youtubeID, geniusID})
              })
            })
            await SyncedLyric.sync()
            return true
          });
      }
      catch (error) {
        console.log(error)
        return false
      }
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
      const matchingLyrics = await SyncedLyric.findAll({
        where: args,
        order: [
          'time'
        ]
      })
      if (!matchingLyrics || !matchingLyrics.length) {
        throw new SchemaError('None found');
      }

      //if requested, return a 2 dimensional aray
      if (args.groupedByTime){

      }
      return (matchingLyrics)


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
    async synchronizationData(parent, args, context, info) {
      var queryID = null
      var fields = graphqlFields(info)
      delete fields.__typename

      const {geniusID, youtubeID} = args

      //check how we should go about querying (or if an id was even supplied) 
      if (geniusID) {
        queryID = {geniusID}
      }
      else if (youtubeID) {
        queryID = {youtubeID}
      }
      else {
        return null
      }

      const syncData = await SynchronizationData.findAll({
        where: queryID,
      })
      if (!syncData || !syncData.length) {
        throw new SchemaError('None found');
      }
      else {
        return syncData
      }
    }
  }
};
module.exports = resolvers;
