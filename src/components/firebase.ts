import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const loginWithFirebase = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
