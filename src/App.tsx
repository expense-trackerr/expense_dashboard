import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { ListOfTodos } from "./components/ListOfTodos";

function App() {
  const [auth, setAuth] = useState(
    window.localStorage.getItem("auth") === "true" || false
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        user.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
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
        <ListOfTodos token={token} />
      ) : (
        <button onClick={loginWithFirebase}>Login with Google</button>
      )}
    </>
  );
}

export default App;
