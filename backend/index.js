const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
  type Query{
    randomCatNoise: String
    isCorrectInput(input:String) : Boolean
  }
`
const noises = ["MEOOW", "meoow", "*hiss*", "*purr*"]
var lastNoise = ""
const resolvers = {
  Query: {
    randomCatNoise: () => {
      lastNoise = noises[Math.floor(Math.random() * noises.length)]
      return lastNoise
    },
    isCorrectInput(parent, args, context, info) {
      console.log(args.input)
      return args.input === lastNoise
    }
  },
}; 

const myPlugin = {
  requestDidStart(requestContext) {
    console.log(requestContext.request.query + "\n");
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
