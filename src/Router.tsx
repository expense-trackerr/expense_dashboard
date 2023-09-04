import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/auth-pages/Login';
import { Signup } from './pages/auth-pages/Signup';
import { MainDashboard } from './pages/main/MainDashboard';
import { PlaidContextProvider } from './contexts/PlaidContext';
import { PrivateAuthRoute, PrivateRoute } from './pages/routes/PrivateRoute';

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PlaidContextProvider>
              <MainDashboard />
            </PlaidContextProvider>
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
  );
};
