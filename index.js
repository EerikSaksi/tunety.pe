const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const resolvers = require('./resolvers');
const typeDefs = gql`
  type SyncedLyric {
    text: String!
    time: Float!
    id: Int!
    horizontalOffsetPercentage: Float!
  }
  type UserData {
    userName: String
    existsInDB: Boolean!
    synchronizations: [SynchronizationData]!
  }
  input InputSyncedLyric {
    text: String!
    time: Float!
    id: Int!
  }
  type SearchResult {
    id: String!
    imgUrl: String!
    text: String!
    forwardingUrl: String!
    duration: Float!
  }
  type SynchronizationData {
    searchResult: SearchResult!
    youtubeID: String!
    geniusID: String!
    startTime: Float!
    endTime: Float!
  }
  input InputSynchronizationData {
    youtubeID: String!
    geniusID: String!
    tokenId: String!

    startTime: Float!
    endTime: Float!
  }
  type Mutation {
    postSyncedLyrics(syncedLyrics: [[InputSyncedLyric]], synchronizationData: InputSynchronizationData, tokenId: String): Boolean!
    createUser(tokenId: String, userName: String): Boolean!
  }
  type Query {
    syncedLyrics(youtubeID: String, geniusID: String): [[SyncedLyric]]
    geniusSearchResults(query: String): [SearchResult]
    synchronizationSearch(query: String): [SearchResult]
    synchronizationData(youtubeID: String, geniusID: String): [SynchronizationData]
    youtubeSearchResults(query: String): [SearchResult]
    geniusSongData(id: String): SearchResult!
    youtubeVideoData(url: String, id: String): SearchResult!
    displayLyrics(id: String): [String]
    processedLyrics(id: String): [[SyncedLyric]]
    signedInUser(tokenId: String, userName: String): UserData!
    userNameTaken(userName: String): Boolean!
  }
`;
const myPlugin = {
  requestDidStart(requestContext) {
    return {
      didEncounterErrors(requestContext) {
        console.log(requestContext.errors);
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [myPlugin],
});

const app = express();
app.get(
  ('*',
  (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  })
);

app.use(express.static('public/static'));
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 Server ready at http://localhost:${port}/graphql`));
module.exports = server;
