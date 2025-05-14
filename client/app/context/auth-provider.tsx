import { useLazyQuery } from '@apollo/client/index.js';
import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { GET_SESSION } from '~/graphql/get-session';

const AuthContext = createContext({
  session: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState(null);
  const [loadSession, { data, loading }] = useLazyQuery(GET_SESSION);

  useEffect(() => {
    loadSession();
  }, []);

  useEffect(() => {
    if (data?.getSessionFromRefreshToken) {
      setSession(data.getSessionFromRefreshToken);
      console.log('session', session);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
