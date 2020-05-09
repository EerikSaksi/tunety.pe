import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000',
});
cache.writeData({
  data: {
    input: '',
    accuracy: 1
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

async function setInput(){
  await new Promise(resolve => setTimeout(resolve, 1000));
  client.writeData({"data": {"input": "https://www.youtube.com/watch?v=HxkmXnRQblE"}})
}
setInput();
serviceWorker.unregister();
