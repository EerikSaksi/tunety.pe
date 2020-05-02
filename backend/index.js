const {ApolloServer, gql, UserInputError} = require('apollo-server');
const fetch = require('node-fetch')
const getSubtitles = require('youtube-captions-scraper').getSubtitles;
const typeDefs = gql`
  type Query {
    isValidYoutubeUrl(url: String): Boolean
    getCaptions(url: String): [CaptionData]
  }
  type CaptionData {
    dur: Float,
    text: String,
    sleepTime: Float
  }
  type Typeable{
    text: String
    id : Int
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
        return [].concat(...captions.map((caption, index, captions) => {
          if (index != captions.length - 1){
            const intervalStart = caption.start
            const words = captions[index + 1].text.split(" ");
            //stores the average estimated length of each word
            const delta = (captions[index + 1].start - intervalStart) / words.length;
            return words.map((word) => {
              return {"text": word, "dur": delta * 2, sleepTime: delta};
            });
          }
          return {...caption};
        }))
      })
      .catch((err) => {
        throw new UserInputError(err);
      })
    },
  } 
};
const myPlugin = {
  requestDidStart(requestContext) {
    if (requestContext.request.query.split("\n")[0] != 'query IntrospectionQuery {'){
      console.log('Variables: ' + JSON.stringify(requestContext.request.variables))
      console.log('Query: ' + requestContext.request.query);
    return {
      willSendResponse(requestContext){
        //console.log('Response data: ' + JSON.stringify(requestContext.response.data) + '\n');
        return{ 
          didEncounterErrors(requestContext){ 
            //console.log(JSON.stringify(requestContext.errors));
          }
        }
      }
    }
    }
    
  },
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
