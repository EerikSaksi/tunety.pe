const fetch = require('node-fetch');
const {SchemaError, UserInputError} = require('apollo-server');
const {SyncedLyric, SynchronizationData} = require('./orm');
const {getDisplayLyrics, getProcessedLyrics, geniusSearch, geniusSong} = require('./genius_data_fetcher.js')
const {youtubeSearch, youtubeVideo} = require('./google_data_fetcher')
const resolvers = {
  Mutation: {
    async postSyncedLyrics(parent, args, context, info) {
      SynchronizationData.count({where: {youtubeID: args.youtubeID, geniusID: args.geniusID}})
        .then(async (count) => {
          if (count === 0) {
            await SynchronizationData.create({youtubeID: args.youtubeID, geniusID: args.geniusID}).catch((error) => console.log(error))
            await SynchronizationData.sync()

            args.syncedLyrics.forEach(async (row) => {
              row.forEach(async (syncedLyric) => {
                await SyncedLyric.create({...syncedLyric, youtubeID: args.youtubeID, geniusID: args.geniusID}).catch((error) => console.log(error))
              })
            })

            await SyncedLyric.sync()
          }
        });
    },
  },
  Query: {
    async syncedLyrics(parent, args, context, info) {
      const syncedLyrics = await SyncedLyric.findAll({
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
      return(syncedLyrics.map(syncedLyric => syncedLyric.dataValues))
    },
    async geniusSearchResults(parent, args, context, info) {
      //check if supplied was youtube url
      const youtubeVideoData = await youtubeVideo(args.query)
      if (youtubeVideoData) {
        return [youtubeVideoData]
      }
      //otherwise return geniusSearchResults
      return await geniusSearch(args.query);
    },

    async geniusSongData(parent, args, context, info) {
      return await geniusSong(args.id)
    },
    async youtubeVideoData(parent, args, context, info) {
      if (args.url) {
        const response = await youtubeVideo(args.url)
        if (!response) {
          throw new UserInputError("Not a valid YouTube URL")
        }
        return response
      }
      else if (args.id) {
        const response = youtubeVideo(`https://www.youtube.com/watch?v=${args.id}`)
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
      });
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
