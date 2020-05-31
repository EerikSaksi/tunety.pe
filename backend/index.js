const {ApolloServer, gql} = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = gql`
  type Caption {
    text: String
    dur: Float
    sleepAfter: Float
    horizontalPosition: Int
    ordering: Int
  }
  input InputCaption {
    id: Int
    sleepAfter: Float
  }
  type SearchResult {
    id: String
    imgUrl: String
    artistName: String
    songName: String
  }
  type Mutation {
    postCaptions(captions:[InputCaption], tokenized: Boolean): Boolean
  }
  type Query {
    syncedLyrics(id: String): [Caption]
    searchResults(query: String): [SearchResult]
    displayLyrics(id: String): String
    processedLyrics(id: String): [String]
  }
`
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
    }
  }}
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
