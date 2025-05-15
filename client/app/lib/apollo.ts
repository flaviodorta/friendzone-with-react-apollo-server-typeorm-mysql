import { HttpLink, InMemoryCache, from } from '@apollo/client/index.js';
import {
  createApolloLoaderHandler,
  ApolloClient,
} from '@apollo/client-integration-react-router';
import { onError } from '@apollo/client/link/error';
// import { errorLink } from './on-error';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    console.log('ERROR');
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.error(`[GraphQL error]:`, err.message);

        // Exemplo: redirecionar se token expirou
        if (err.extensions?.code === 'UNAUTHENTICATED') {
          // Aqui você pode acionar um refresh token, logout, etc.
          console.warn('Usuário não autenticado.');
        }

        if (err.extensions?.code === 'FORBIDDEN') {
          console.warn('Acesso negado.');
        }
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  }
);

export const makeClient = (request?: Request) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
  });
};
export const apolloLoader = createApolloLoaderHandler(makeClient);
