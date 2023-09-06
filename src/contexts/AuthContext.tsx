import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { gqlClient } from '../config/gqlClient';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  currentUser: User | null;
  token: string;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  token: '',
  login: async () => {
    throw new Error('login function is not implemented');
  },
  loginWithGoogle: async () => {
    throw new Error('loginWithGoogle function is not implemented');
  },
  signup: async () => {
    throw new Error('signup function is not implemented');
  },
  logout: async () => {
    throw new Error('logout function is not implemented');
  },
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  function signup(email: string, password: string) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  function loginWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  async function logout() {
    try {
      const auth = getAuth();
      await signOut(auth);
      localStorage.clear();
      gqlClient.resetStore(); // Clear the graphql cache
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        user
          .getIdToken()
          .then((currToken) => {
            window.localStorage.setItem('token', currToken);
            setToken(currToken);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setCurrentUser(null);
        setToken('');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      token,
      login,
      loginWithGoogle,
      signup,
      logout,
    }),
    [currentUser, token, login, loginWithGoogle, signup, logout]
  );

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
