import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { getAuth, signOut } from 'firebase/auth';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const handleLogout = (navigate: NavigateFunction) => {
  localStorage.clear();
  const auth = getAuth();
  void signOut(auth).then(() => navigate('/login'));
};

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={() => handleLogout(navigate)}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
