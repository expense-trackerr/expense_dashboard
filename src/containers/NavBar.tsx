import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsIcon from '@mui/icons-material/Settings';
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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gqlClient } from '../config/gqlClient';
import { useAuth } from '../contexts/AuthContext';

const DRAWER_WIDTH = 200;

const drawerItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Categories', icon: <DashboardCustomizeIcon />, path: '/categories' },
  { text: 'Stats', icon: <QueryStatsIcon />, path: '/stats' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const getDrawerItemsWithAction = (handleLogout: () => Promise<void>) => [
  { text: 'Logout', icon: <LogoutIcon />, path: '/login', action: handleLogout },
];

export const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  // const [selectedPath, setSelectedPath] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    localStorage.clear();
    await logout();
    gqlClient.resetStore(); // Clear the graphql cache
    navigate('/login');
  };

  const drawerItemsWithAction = getDrawerItemsWithAction(handleLogout);

  const drawer = (
    <Grid direction={'column'} container justifyContent="space-between" alignItems={'center'} height="100%">
      <Grid item></Grid>
      <Grid item>
        <List>
          {drawerItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item>
        <List>
          {drawerItemsWithAction.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={item.action}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );

  return (
    <>
      {/* Temporary Drawer */}
      <Toolbar sx={{ display: { sm: 'none' } }}>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
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
