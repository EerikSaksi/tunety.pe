const { ApolloServer, gql, PubSub, withFilter } = require('apollo-server');
const pubsub = new PubSub();

const typeDefs = gql`
  type Subscription{
    deleteWord(id: Int): [Int] 
  }
  type Query{
    getEnemy : Enemy   
  }
  type Mutation{
    setInput(input:String): Boolean
  }
  type Enemy{
    name: String
    typeables: [Typeable]
  }
  type Typeable{
    text: String
  }
`
const typeables = [{id: 0, "text": "MEOOW"}, {id: 1, "text":"meoow"}, {id: 2, "text":"*hiss*"}, {id: 3, "text": "*purr*"}]
const enemy = {'typeables': typeables, 'name': 'Whiskers'}

var toDelete = []
const resolvers = {
  Subscription: {
    deleteWord: {
      subscribe: () => pubsub.asyncIterator(['WORD_DELETED']),
    },
  },

  Query: {
    getEnemy(){
      return enemy
    }
  },
  Mutation: {
    setInput(parent, args, context, info){
      toDelete = enemy.typeables.filter(t => t.text === args.input).map(t => t.id)
      if (toDelete != 0){
        pubsub.publish('WORD_DELETED', {deleteWord: toDelete});
      }
      return true
    }
  }
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
