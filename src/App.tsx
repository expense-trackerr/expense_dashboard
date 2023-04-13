import { ListOfTodos } from "./components/ListOfTodos";
import { Login } from "./pages/auth-pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import { Signup } from "./pages/auth-pages/Signup";
import { PrivateRoute } from "./pages/routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ListOfTodos />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
