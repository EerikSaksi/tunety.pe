import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from 'apollo-boost'
import 'bootstrap/dist/css/bootstrap.min.css';

const cache = new InMemoryCache()

const client = new ApolloClient({
  cache: cache,
  resolvers: {
    Mutation: {
      handleInput: (_root, {input}, { cache }) => {
        cache.client.writeData({data:{input:input}});
        const VALID_URL_QUERY = gql`
          {
            validUrl @client
          }
        `
        const { validUrl } = cache.readQuery({ query: VALID_URL_QUERY });
        if (!validUrl){
          const CHECK_VALID_URL = gql`
            mutation checkValidURL ($input: String) {
              checkValidURL(input: $input) @client
            }
          `;
          cache.writeQuery({ query: CHECK_VALID_URL, variables: {input:input}});
        }
      },
      checkValidURL: async (_root, {input}, { cache }) => {
      }
    }
  },
  uri: 'http://localhost:4000',
});
cache.writeData({
  data: {
    input: '',
    accuracy: 1,
    gameStarted: false,
    validUrl: ""
  },
});


ReactDOM.render(
  <ApolloProvider client = {client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
