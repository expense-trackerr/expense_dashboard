import { ListOfTodos } from "./components/ListOfTodos";
import { Login } from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

export default App;
