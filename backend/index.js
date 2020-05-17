const {ApolloServer, gql} = require('apollo-server');
const {resolvers} = require('./resolvers');
const typeDefs = gql`
  type Mutation {
    postCaptions(captions: [Caption], videoID: String)
  }
  type Query {
    isValidYoutubeUrl(url: String): Boolean
    getCaptions(url: String): [Caption]
  }
  type Caption{
    text: String
    id : Int
    dur: Float,
    sleepAfter: Float
    horizontalPosition: Int
    ordering: Int
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
