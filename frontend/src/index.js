import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { }

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000',
});

cache.writeData({
  data: {
    input: '',
    accuracy: 1,
    gameStarted: false
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
