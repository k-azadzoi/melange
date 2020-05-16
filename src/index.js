import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import PlanetSearch from './components/PlanetSearch'
import Planet from './components/Planet'
import './index.css'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'https://review-hasura.herokuapp.com/v1/graphql' })
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path='/planet/:id' component={Planet}/>
        <Route path='/' component={PlanetSearch}/>
      </Switch>
    </ApolloProvider>
  </BrowserRouter>
);

render(<App />, document.getElementById('root'));
