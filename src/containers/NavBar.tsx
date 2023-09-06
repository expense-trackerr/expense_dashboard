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
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gqlClient } from '../config/gqlClient';
import { useAuth } from '../contexts/AuthContext';
import { themeColors } from '../utils/theme-utils';

export const DRAWER_WIDTH = 180;

const drawerPaperStyle = {
  boxSizing: 'border-box',
  width: DRAWER_WIDTH,
  border: 'none',
  backgroundColor: themeColors.greyBackground,
};

const ListItemButtonStyled = (props: ListItemButtonProps) => (
  <ListItemButton
    {...props}
    sx={{
      '&.Mui-selected': {
        '& .MuiListItemIcon-root': {
          color: 'black',
        },
        color: 'black !important',
        borderRight: '5px solid black',
        backgroundColor: 'transparent',
      },
      '&.Mui-selected:hover': {
        backgroundColor: themeColors.greyBackground,
      },
      '&.MuiListItemButton-root': {
        color: themeColors.greyText,
        width: DRAWER_WIDTH,
      },
      ' & .MuiListItemIcon-root': {
        color: themeColors.greyText,
        minWidth: '40px',
      },
    }}
  />
);

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
  const [selectedPath, setSelectedPath] = useState('');

  useEffect(() => {
    setSelectedPath(window.location.pathname);
  }, [window.location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleListItemOnClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, path: string) => {
    setSelectedPath(path);
  };

  const drawerItemsWithAction = getDrawerItemsWithAction(handleLogout);

  const drawer = (
    <Grid direction={'column'} container justifyContent="space-between" alignItems="flex-start" height="100%">
      <Grid item></Grid>
      <Grid item>
        <List>
          {drawerItems.map((item) => (
            <ListItem key={item.text} onClick={(e) => handleListItemOnClick(e, item.path)} disablePadding>
              <ListItemButtonStyled onClick={() => navigate(item.path)} selected={selectedPath === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'body1' }} />
              </ListItemButtonStyled>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item>
        <List>
          {drawerItemsWithAction.map((item) => (
            <ListItem key={item.text} onClick={(e) => handleListItemOnClick(e, item.path)} disablePadding>
              <ListItemButton
                onClick={item.action}
                selected={selectedPath === item.path}
                sx={{
                  '&.MuiListItemButton-root': {
                    width: DRAWER_WIDTH,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: '40px',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'body1' }} />
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
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': drawerPaperStyle,
          }}
        >
          {drawer}
        </Drawer>
        {/* Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': drawerPaperStyle,
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};
