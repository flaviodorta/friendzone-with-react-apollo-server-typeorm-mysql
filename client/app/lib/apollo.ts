import { HttpLink, InMemoryCache, from } from '@apollo/client/index.js';
import {
  createApolloLoaderHandler,
  ApolloClient,
} from '@apollo/client-integration-react-router';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

export const makeClient = (request?: Request) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([httpLink]),
  });
};
export const apolloLoader = createApolloLoaderHandler(makeClient);
