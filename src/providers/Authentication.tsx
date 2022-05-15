import React, { createContext, useContext, useEffect, useState } from 'react';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthenticationContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
  getProfile: () => Promise<void>;
};

const AuthenticationContext = createContext<AuthenticationContextType>({
  isAuthenticated: false,
  user: null,
} as AuthenticationContextType);

const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getProfile = async () => {
    setIsLoading(true);
    fetch('/api/profile').then(async (d) => {
      if (d.status >= 400) {
        setUser(null);
        setIsAuthenticated(null);
        return null;
      }

      setUser(await d.json());
      setIsAuthenticated(true);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        getProfile,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;

export const useAuthenticatedUser = () => {
  const { user, isAuthenticated } = useContext(AuthenticationContext);
  return { user, isAuthenticated };
};
