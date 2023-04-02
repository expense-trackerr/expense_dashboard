import firebase from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
      }
    });
  }, []);

  const loginWithFirebase = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
      }
    });
  };

  return (
    <>
      {auth ? (
        <h1>Expense Tracker</h1>
      ) : (
        <button onClick={loginWithFirebase}>Login with Google</button>
      )}
    </>
  );
}

export default App;
