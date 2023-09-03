import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { gqlClient } from '../config/gqlClient';

const DRAWER_WIDTH = 200;

const drawerItems = [
  { text: 'Home', icon: <HomeIcon /> },
  { text: 'Categories', icon: <DashboardCustomizeIcon /> },
  { text: 'Stats', icon: <QueryStatsIcon /> },
];

const handleLogout = (navigate: NavigateFunction) => {
  localStorage.clear();
  const auth = getAuth();
  void signOut(auth).then(() => {
    gqlClient.resetStore(); // Clear the graphql cache
    navigate('/login');
  });
};

export const NavBar = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Grid direction={'column'} container justifyContent={'center'} alignItems={'center'} height="100%" mt="-60px">
      <List>
        {drawerItems.map((item, i) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );

  return (
    <>
      {/* Temporary Drawer */}
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        {/* Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};
