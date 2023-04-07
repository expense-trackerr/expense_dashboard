import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { ListOfTodos } from "./components/ListOfTodos";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { loginWithFirebase } from "./components/firebase";

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

  return (
    <>
      {auth ? (
        <ListOfTodos token={token} />
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
}

export default App;
