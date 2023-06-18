import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User,
    UserCredential,
} from 'firebase/auth';
import React, { useContext, useEffect, useMemo, useState } from 'react';

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
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');

    async function signup(email: string, password: string) {
        const auth = getAuth();
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    async function login(email: string, password: string) {
        const auth = getAuth();
        return await signInWithEmailAndPassword(auth, email, password);
    }

    async function loginWithGoogle() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    }

    async function logout() {
        const auth = getAuth();
        await signOut(auth);
    }

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
                user.getIdToken()
                    .then((token) => {
                        window.localStorage.setItem('token', token);
                        setToken(token);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
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

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
