const fetch = require('node-fetch');
const { SchemaError } = require('apollo-server');
const { VideoCaptions, Caption } = require('./orm');
const { getDisplayLyrics, getProcessedLyrics, geniusSearch, geniusSong } = require('./genius_data_fetcher.js')
const { youtubeSearch, youtubeVideo} = require('./google_data_fetcher') 
const resolvers = {
  Mutation: {
    async postCaptions(parent, args, context, info){
      args.captions.forEach(async (caption) => {
        await Caption.create({...caption})
      })
      await VideoCaptions.create(args.url)
      await VideoCaptions.sync()
      await Caption.sync()
    },
  },
  Query: {
    async syncedLyrics(parent, args, context, info){
      const captions = await VideoCaptions.findOne({
        where: {
          videoID: args.id
        },
        include: Caption
      });
      if (!captions) {
        throw new SchemaError("No lyric synchronization for this video exists.");
      }
      return captions;
    },
    async geniusSearchResults(parent, args, context, info){
      //check if supplied was youtube url
      const youtubeVideoData = await youtubeVideo(args.query)
      if (youtubeVideoData){
        return [youtubeVideoData]
      }
      //otherwise return geniusSearchResults
      return await geniusSearch(args.query);
    }, 

    async geniusSongData(parent, args, context, info){
      return await geniusSong(args.id)
    },
    async youtubeVideoData(parent, args, context, info){
      return await youtubeVideo(args.url)
    },
    async youtubeSearchResults(parent, args, context, info){
      //check if supplied was youtube url
      const youtubeVideoData = await youtubeVideo(args.query)
      if (youtubeVideoData){
        return [youtubeVideoData]
      }
      else {
        return await youtubeSearch(args.query)
      }
    },
    async processedLyrics(parent, args, context, info){
      return await getProcessedLyrics(args.id)
    },
    async displayLyrics(parent, args, context, info){
      return await getDisplayLyrics(args.id)
    }
  }
};
module.exports = resolvers;
