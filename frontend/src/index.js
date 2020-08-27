import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css';


const client = new ApolloClient({
  uri: '/graphql',
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
