import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/auth-pages/Login';
import { Signup } from './pages/auth-pages/Signup';
import { CategoriesControl } from './pages/categories/CategoriesControl';
import { MainDashboard } from './pages/main/MainDashboard';
import { PrivateAuthRoute, PrivateRoute } from './utils/PrivateRoute';

export const Router = () => {
  return (
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
        path="/categories"
        element={
          <PrivateRoute>
            <CategoriesControl />
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
