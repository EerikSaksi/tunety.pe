import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import 'bootstrap/dist/css/bootstrap.min.css';


const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: '/graphql',
  cache
});

window.YTConfig = {
  host: 'https://www.youtube.com'
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
