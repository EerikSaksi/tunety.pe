import React from 'react';
import GameEntry from './game_entry';
import { mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  link: createHttpLink({
    uri: '/graphql',
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
