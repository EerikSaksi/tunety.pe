const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
  type Query{
    randomCatNoise: String
  }
`
const noises = ["MEOOW", "meoow", "*hiss*", "*purr*"]

const resolvers = {
  Query: {
    randomCatNoise: () => noises[Math.floor(Math.random() * noises.length)],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
