import { Container } from '@mui/material';
import { DRAWER_WIDTH, NavBar } from '../containers/NavBar';
import { useAuth } from './AuthContext';

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();

  return token ? (
    <>
      <NavBar />
      <Container
        maxWidth="lg"
        sx={{
          marginLeft: `${DRAWER_WIDTH}px`,
        }}
      >
        {children}
      </Container>
    </>
  ) : (
    <>{children}</>
  );
};
