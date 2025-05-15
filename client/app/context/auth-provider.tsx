import { useLazyQuery, useQuery } from '@apollo/client/index.js';
import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { GET_SESSION } from '~/graphql/get-session';

const AuthContext = createContext({
  session: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, loading } = useQuery(GET_SESSION);

  const session = data?.getSessionFromRefreshToken ?? null;

  console.log('session', session);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
