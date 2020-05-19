import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import PlanetSearch from './components/PlanetSearch'
import Planet from './components/Planet'
import './index.css'

const GRAPHQL_ENDPOINT = 'review-hasura.herokuapp.com/v1/graphql'

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
})

//deploy to netlify didn't work, but added an s to ws in the uri link and it worked
const wsLink = new WebSocketLink({
  uri: `wss://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  }
})

//for telling our app to use a 1) websocket link for subscriptions and 2) httpLink for queries and mutations
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink, // 1) subscriptions
  httpLink // 2) queries and mutations
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path='/planet/:id' component={Planet}/>
        <Route exact path='/' component={PlanetSearch}/>
      </Switch>
    </ApolloProvider>
  </BrowserRouter>
);

render(<App />, document.getElementById('root'));
