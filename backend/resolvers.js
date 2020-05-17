const fetch = require('node-fetch');
const { VideoCaptions, Caption } = require('./orm')
var alreadySupplied = false;
const resolvers = {
  Query: {
    async isValidYoutubeUrl(parent, args, context, info){
      if (alreadySupplied){
        return true
      }
      return await fetch("https://www.youtube.com/oembed?format=json&url=" + args.url)
      .then((response) => {
        if (response.ok){
          return response.text();
        }
      })
      .then((text) => {
        if (text && text != "Not Found"){
          alreadySupplied = true;
        }
        else{
          alreadySupplied = false;
        }
        return alreadySupplied;
      })
      .catch((err) => {
        return false;
      })
    },
    async getCaptions(parent, args, context, info){
      const captions = await Captain.findOne({
        where: {
          video_id : args.url
        },
        include: Typeable
      });
      return captions;
    },
    async postCaptions(parent, args, context, info){
      args.captions.forEach(caption => {
        await Caption.create({...caption})
      })
      await VideoCaptions.create(args.url)
      await VideoCaptions.sync()
      await Caption.sync()
    }
  },
};
module.exports = resolvers;
