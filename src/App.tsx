import { ApolloProvider } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import { MainDashboard } from './pages/main/MainDashboard';
import { gqlClient } from './config/gqlClient';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/auth-pages/Login';
import { Signup } from './pages/auth-pages/Signup';
import { PrivateAuthRoute, PrivateRoute } from './pages/routes/PrivateRoute';
import { PlaidContextProvider } from './pages/main/PlaidContext';
import { NavBar } from './containers/NavBar';

function App() {
  return (
    <ApolloProvider client={gqlClient}>
      <AuthProvider>
        <NavBar />
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
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
