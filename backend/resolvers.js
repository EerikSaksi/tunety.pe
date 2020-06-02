const fetch = require('node-fetch');
const { SchemaError } = require('apollo-server');
const { VideoCaptions, Caption } = require('./orm');
const {getDisplayLyrics, getProcessedLyrics, geniusSearch} = require('./caption_text')
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
    async searchResults(parent, args, context, info){
      var youtubeVideoData = undefined;
      await fetch("https://www.youtube.com/oembed?format=json&url=" + args.query)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        youtubeVideoData = 
        {
          imgUrl: json.thumbnail_url, 
          artistName: json.author_name,
          songName: json.title,
        }
      })
      .catch(error => {
      })
      if (youtubeVideoData){
        return [youtubeVideoData];
      }
      const response = await geniusSearch(args.query);
      return response;
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
