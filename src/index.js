import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Planets from './components/Planets'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://review-hasura.herokuapp.com/v1/graphql' })
});

const App = () => (
  <ApolloProvider client={client}>
    <Planets/>  
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));
