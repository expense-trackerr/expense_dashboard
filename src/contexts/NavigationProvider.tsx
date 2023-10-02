import { Container, styled } from '@mui/material';
import { DRAWER_WIDTH, NavBar } from '../containers/NavBar';
import { useAuth } from './AuthContext';

const StyledContainer = styled(Container)(({ theme }) => ({
  '&&': {
    paddingLeft: `${DRAWER_WIDTH + 30}px `,
    paddingTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '20px',
    },
  },
}));
export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();

  return token ? (
    <>
      <NavBar />
      <StyledContainer maxWidth="lg">{children}</StyledContainer>
    </>
  ) : (
    <>{children}</>
  );
};
