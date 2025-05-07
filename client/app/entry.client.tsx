import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';
import { ApolloProvider } from '@apollo/client/index.js';
import { makeClient } from './lib/apollo';

startTransition(() => {
  const client = makeClient();
  hydrateRoot(
    document,
    <ApolloProvider client={client}>
      <HydratedRouter />
    </ApolloProvider>
  );
});
