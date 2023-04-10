import React, { useContext, useState, useEffect, useMemo } from "react";
import firebase from "firebase/app";
import "firebase/auth";

import { auth } from "../config/firebase-config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  function signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user || undefined);
    });
    return unsubscribe;
  }, []);

  const value = useMemo(() => {
    return {
      currentUser,
      signup,
    };
  }, [currentUser, signup]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
