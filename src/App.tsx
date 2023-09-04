import { ApolloProvider } from '@apollo/client';
import { gqlClient } from './config/gqlClient';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationProvider } from './contexts/NavigationProvider';
import { Router } from './Router';

function App() {
  return (
    <ApolloProvider client={gqlClient}>
      <AuthProvider>
        <NavigationProvider>
          <Router />
        </NavigationProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
