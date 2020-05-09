const {ApolloServer, gql} = require('apollo-server');
const scrape_captions = require('./scraper');
const fetch = require('node-fetch');
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
      const response = await scrape_captions(args.url);
      return response;
    }
  },
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
      },
      willSendResponse(requestContext){
        if (!requestContext.logger){
          console.log(JSON.stringify(requestContext.logger).slice(0,100));
        }
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

