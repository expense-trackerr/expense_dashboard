import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { ListOfTodos } from "./components/ListOfTodos";
import { Login } from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem("auth") === "true" || false
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        window.localStorage.setItem("auth", "true");
        user.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        setIsAuthenticated(false);
        window.localStorage.setItem("auth", "false");
      }
    });
  }, []);

  const loginWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((userCred) => {
      if (userCred) {
        setIsAuthenticated(true);
        window.localStorage.setItem("auth", "true");
      }
    });
  };

  const signupWithFirebase = async (email: string, password: string) => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Signup Error: ", error);
    }
  };

  const loginWithFirebase = async (email: string, password: string) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  const resetPassword = async (email: string) => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Reset Password Error: ", error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <ListOfTodos token={token} />
      ) : (
        <Login loginWithGoogle={loginWithGoogle} login={loginWithFirebase} />
      )}
    </>
  );
}

export default App;
