import { HttpLink, InMemoryCache } from '@apollo/client/index.js';
import {
  createApolloLoaderHandler,
  ApolloClient,
} from '@apollo/client-integration-react-router';

export const makeClient = (request?: Request) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: 'http://localhost:4000/' }),
    credentials: 'include',
  });
};
export const apolloLoader = createApolloLoaderHandler(makeClient);
