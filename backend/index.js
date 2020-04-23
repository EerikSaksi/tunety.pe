const {ApolloServer, gql} = require('apollo-server');
const fetch = require('node-fetch')
const {google} = require('googleapis')

const youtube = google.youtube({
  auth: 'AIzaSyDzgkV6BCYQYEKURTZGmpu4Yh5WBkJqQ_s'
})

const typeDefs = gql`
  type Query {
    getTypeable: [Typeable]
    isValidYoutubeUrl(input: String): Boolean
  }

  type Typeable{
    text: String
    id : Int
    horizontalPosition: Int
    defaultFallingTime: Int
  }
  
`
const typeables = [{id: 0, "text": "MEOOW"}, {id: 1, "text":"meoow"}, {id: 2, "text":"*hiss*"}, {id: 3, "text": "*purr*"}]
var valid_input = false; 
var lyrics = [];
const resolvers = {
  Query: {
    getTypeable() {
      return null;
    },
    async isValidYoutubeUrl(parent, args, context, info){
      if (valid_input){
        return true;
      }
      if (args && args.input){
        const response = await fetch('https://www.youtube.com/oembed?format=json&url=' + args.input);
        const responseText = await response.text()
        if (responseText != 'Not Found'){
          console.log(responseText)
          valid_input = true;
          youtube
        }
      }
      return valid_input;
    }
  },
}; 

const myPlugin = {
  requestDidStart(requestContext) {
    console.log('Variables: ' + JSON.stringify(requestContext.request.variables))
    console.log('Query: ' + requestContext.request.query.split("\n").slice(0,2));
    return {
      willSendResponse(requestContext){
        console.log('Response data: ' + JSON.stringify(requestContext.response.data) + '\n');
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
