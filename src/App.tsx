import { ApolloProvider } from '@apollo/client';
import { responsiveFontSizes, ThemeProvider } from '@mui/material';
import { gqlClient } from './config/gqlClient';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationProvider } from './contexts/NavigationProvider';
import { Router } from './Router';
import { theme } from './utils/theme-utils';

const responsiveTheme = responsiveFontSizes(theme);

function App() {
  return (
    <ApolloProvider client={gqlClient}>
      <AuthProvider>
        <ThemeProvider theme={responsiveTheme}>
          <NavigationProvider>
            <Router />
          </NavigationProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
