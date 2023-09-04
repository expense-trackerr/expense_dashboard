import { NavBar } from '../containers/NavBar';
import { useAuth } from './AuthContext';

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();

  return token ? (
    <>
      <NavBar />
      {children}
    </>
  ) : (
    <>{children}</>
  );
};
