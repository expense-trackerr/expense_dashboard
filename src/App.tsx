import { ApolloProvider } from '@apollo/client';
import { gqlClient } from './config/gqlClient';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationProvider } from './contexts/NavigationProvider';
import { Router } from './Router';

function App() {
  return (
    <ApolloProvider client={gqlClient}>
      <NavigationProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </NavigationProvider>
    </ApolloProvider>
  );
}

export default App;
