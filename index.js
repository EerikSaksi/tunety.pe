const {ApolloServer, gql} = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = gql`
  type SyncedLyric {
    text: String
    fallingDur: Int
    time: Int
    horizontalPosition: Int
    ordering: Int
  }
  input InputSyncedLyric {
    id: Int
    time: Float
  }
  type SearchResult {
    id: String
    imgUrl: String
    text: String
    isYoutube: Boolean
  }
  type Mutation {
    postSyncedLyrics(syncedLyrics:[InputSyncedLyric], tokenized: Boolean): Boolean
  }
  type Query {
    syncedLyrics(id: String): [SyncedLyric]
    geniusSearchResults(query: String): [SearchResult]
    youtubeSearchResults(query: String): [SearchResult]
    geniusSongData(id: String): SearchResult
    youtubeVideoData(url: String): SearchResult
    displayLyrics(id: String): [String]
    processedLyrics(id: String): [[String]]
  }
`
const myPlugin = {
  requestDidStart(requestContext) {
    if (requestContext.request.query.split("\n")[0] != 'query IntrospectionQuery {') {
      console.log('Variables: ' + JSON.stringify(requestContext.request.variables))
      console.log('Query: ' + requestContext.request.query);
    }
    return {
      didEncounterErrors(requestContext) {
        console.log(JSON.stringify(requestContext.errors));
      },
      //      willSendResponse(requestContext){
      //        console.log(JSON.stringify(requestContext.response));
      //      },
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
server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
module.exports = server
