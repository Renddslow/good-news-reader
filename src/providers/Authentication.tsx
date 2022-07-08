import React, { createContext, useContext, useEffect, useState } from 'react';
import mixpanel from 'mixpanel-browser';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  completions: Completion[];
  words: Word[];
};

export type Completion = {
  read_at: string;
  page: number;
};

export type Word = {
  collected_at: string;
  page: number;
  word: string;
};

export type AuthenticationContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  completions: Completion[];
  words: Word[];
  user: User;
  getProfile: () => Promise<void>;
  completePage: (page: number) => Promise<void>;
  collectLink: (link: string, movement: number, page: number) => Promise<void>;
};

const AuthenticationContext = createContext<AuthenticationContextType>({
  isAuthenticated: false,
  user: null,
} as AuthenticationContextType);

const post = (route: string, body: Record<string, unknown>) =>
  fetch(route, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((d) => d.json());

const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [completions, setCompletions] = useState([]);
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getProfile = async () => {
    setIsLoading(true);
    fetch('/api/profile').then(async (d) => {
      if (d.status >= 400) {
        setUser(null);
        setIsAuthenticated(null);
        setIsLoading(false);
        return null;
      }

      const user = await d.json();

      mixpanel.identify(user.id);
      mixpanel.people.set({
        $first_name: user.firstName,
        $last_name: user.lastName,
        $distinct_id: user.id,
        $email: user.email,
        $created: user.created,
      });
      setUser(user);
      setIsAuthenticated(true);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setCompletions(user.completions);
      setWords(user.words);
    }
  }, [user]);

  const completePage = async (page: number) => {
    const completion = await post('/api/completions', {
      page,
    });
    setCompletions((s) => [...s, completion]);
  };

  const collectLink = async (word: string, page: number) => {
    const wordResponse = await post('/api/words', {
      words,
      page,
    });
    setWords((s) => [...s, wordResponse]);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        completions,
        words,
        isAuthenticated,
        isLoading,
        getProfile,
        completePage,
        collectLink,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;

export const useAuthenticatedUser = () => {
  const { user, isAuthenticated, isLoading } = useContext(AuthenticationContext);
  return { user, isAuthenticated, isLoading };
};

export const useProgress = () => {
  const { words, completions, completePage, collectLink } = useContext(AuthenticationContext);
  return { words, completions, completePage, collectLink };
};
