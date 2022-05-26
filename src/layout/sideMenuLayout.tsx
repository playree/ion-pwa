import * as React from 'react';
import { Outlet } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import { Box, Drawer, CssBaseline, Toolbar, Typography, Divider, IconButton, 
  List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { 
  Menu as IconMenu,
  ChevronLeft as IconChevronLeft,
  ChevronRight as IconChevronRight,
  Home as IconHome, 
  Person as IconPerson, 
  Settings as IconSettings 
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const menulink = {
  textDecorationLine: 'none',
  color: '#444',
  fontWeight: 'bold'
}

export const SideMenuLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{minHeight: '40px'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <IconMenu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ION PWA Sample
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <IconChevronLeft /> : <IconChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <NavLink to='/' style={menulink} onClick={handleDrawerClose}>
            <ListItem button>
              <ListItemIcon sx={{minWidth: '40px'}}><IconHome /></ListItemIcon>
              <ListItemText primary='Top' />
            </ListItem>
          </NavLink>
          <NavLink to='/did/' style={menulink} onClick={handleDrawerClose}>
            <ListItem button>
              <ListItemIcon sx={{minWidth: '40px'}}><IconPerson /></ListItemIcon>
              <ListItemText primary='DID' />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          <NavLink to='/settings/' style={menulink} onClick={handleDrawerClose}>
            <ListItem button>
              <ListItemIcon sx={{minWidth: '40px'}}><IconSettings /></ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItem>
          </NavLink>
        </List>

      </Drawer>
      <Main onClick={handleDrawerClose} sx={{height: '100vh'}}>
        <DrawerHeader sx={{minHeight: '40px'}} />
        <Outlet />
      </Main>
    </Box>
  );
}
