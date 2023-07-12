import { Route, Routes } from 'react-router-dom';
import { MainDashboard } from './components/MainDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/auth-pages/Login';
import { Signup } from './pages/auth-pages/Signup';
import { PrivateAuthRoute, PrivateRoute } from './pages/routes/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateAuthRoute>
              <Login />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PrivateAuthRoute>
              <Signup />
            </PrivateAuthRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
