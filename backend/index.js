const { ApolloServer, gql, PubSub, withFilter } = require('apollo-server');
const pubsub = new PubSub();

const typeDefs = gql`
  type Query{
    getEnemy : Enemy   
    getTypeable : Typeable
  }
  type Enemy{
    name: String
    typeables: Typeable
  }
  type Typeable{
    text: String
    id : Int
    horizontalPosition: Int
  }
`
const typeables = [{id: 0, "text": "MEOOW"}, {id: 1, "text":"meoow"}, {id: 2, "text":"*hiss*"}, {id: 3, "text": "*purr*"}]
const enemy = {'typeables': typeables, 'name': 'Whiskers'}

const resolvers = {
  Query: {
    getEnemy() {
      return enemy
    },
    getTypeable() {
      if (Math.random() < 1.1){
        console.log({...enemy.typeables[Math.floor(Math.random() * enemy.typeables.length)], horizontalPosition: Math.floor(Math.random() * 100)} );
        return {...enemy.typeables[Math.floor(Math.random() * enemy.typeables.length)], horizontalPosition: Math.floor(Math.random() * 100)} ;
      }
      return null
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
