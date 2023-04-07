import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";

export const loginWithFirebase = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};


export const loginWithFirebaseO = () => {
    const auth = getAuth();
    const provider = new OAuthProvider('apple.com');
    return signInWithPopup(auth, provider);
  };