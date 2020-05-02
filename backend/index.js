const {ApolloServer, gql, UserInputError} = require('apollo-server');
const fetch = require('node-fetch')
const getSubtitles = require('youtube-captions-scraper').getSubtitles;
const typeDefs = gql`
  type Query {
    isValidYoutubeUrl(url: String): Boolean
    getCaptions(url: String): [Typeable]
  }
  type Typeable{
    text: String
    id : Int
    dur: Float,
    sleepAfter: Float
    horizontalPosition: Int
  }
`

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
      var id = args.url.split('v=')[1];
      var ampersandPosition = id.indexOf('&');
      if (ampersandPosition != -1) {
        id = id.substring(0, ampersandPosition);
      }
      return await getSubtitles({
        videoID: id, 
      }).then(function(captions) {
        return [].concat(...captions.map((caption, i, captions) => {
          const lastWordSleepTime = (i == captions.length - 1) ? 0.0 : captions[i + 1].start - (parseFloat(captions[i].start) + parseFloat(captions[i].dur));
          const words = captions[i].text.split(" ");
          //stores the average estimated length of each word
          const delta = (captions[i].dur) / words.length;
          return words.map((word, wordsIndex, words) => {
            const sleepTime = (wordsIndex == words.length - 1) ? lastWordSleepTime : delta * 2;
            return {"text": word, "dur": delta * 2, sleepAfter:sleepTime, horizontalPosition: Math.floor(Math.random() * 100)};
          });
        }))
      })
    },
  } 
};
const myPlugin = {
  requestDidStart(requestContext) {
    if (requestContext.request.query.split("\n")[0] != 'query IntrospectionQuery {'){
      console.log('Variables: ' + JSON.stringify(requestContext.request.variables))
      console.log('Query: ' + requestContext.request.query);
    }
    return {
      didEncounterErrors(requestContext){ 
       console.log(JSON.stringify(requestContext.errors));
      }
    }
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    myPlugin
  ]
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
