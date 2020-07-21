const fetch = require('node-fetch');
const {SchemaError, UserInputError} = require('apollo-server');
const {ManySyncedLyrics, SyncedLyric} = require('./orm');
const {getDisplayLyrics, getProcessedLyrics, geniusSearch, geniusSong} = require('./genius_data_fetcher.js')
const {youtubeSearch, youtubeVideo} = require('./google_data_fetcher')
const resolvers = {
  Mutation: {
    async postSyncedLyrics(parent, args, context, info) {
      args.syncedLyrics.forEach(async (syncedLyric) => {
        await SyncedLyric.create({...caption})
      })
      await ManySyncedLyrics.create(args.url)
      await ManySyncedLyrics.sync()
      await SyncedLyric.sync()
    },
  },
  Query: {
    async syncedLyrics(parent, args, context, info) {
      const captions = await ManySyncedLyrics.findOne({
        where: {
          videoID: args.id
        },
        include: SyncedLyric
      });
      if (!captions) {
        throw new SchemaError("No lyric synchronization for this video exists.");
      }
      return captions;
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
      else if (args.id){
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
    test(parent, args, context, info) {
      return "hello world"
    }
  }
};
module.exports = resolvers;
