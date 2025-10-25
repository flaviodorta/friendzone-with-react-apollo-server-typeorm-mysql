import { useLazyQuery, useQuery } from '@apollo/client/index.js';
import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { GET_SESSION } from '~/graphql/get-session';

type Session = {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePhotoUrl: string;
  };
  revoked: boolean;
};

const AuthContext = createContext<{
  session: Session | null;
  loading: boolean;
}>({
  session: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isPublicRoute = location.pathname === '/';

  const { data, loading } = useQuery(GET_SESSION, {
    skip: isPublicRoute,
    fetchPolicy: 'network-only',
  });

  const session = data?.getSessionFromRefreshToken ?? null;

  console.log('session', session);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
