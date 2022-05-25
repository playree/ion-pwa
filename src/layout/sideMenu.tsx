import { List, Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { 
  Home as IconHome, 
  Person as IconPerson, 
  Settings as IconSettings 
} from '@mui/icons-material'

import { NavLink } from 'react-router-dom';

export const SideMenu = () => {
  const menulink = {
    textDecorationLine: 'none',
    color: '#444',
    fontWeight: 'bold'
  }

  return (
    <>
      <List>
        <NavLink to='/' style={menulink}>
          <ListItem button>
            <ListItemIcon><IconHome /></ListItemIcon>
            <ListItemText primary='Top' />
          </ListItem>
        </NavLink>
        <NavLink to='/did/' style={menulink}>
          <ListItem button>
            <ListItemIcon><IconPerson /></ListItemIcon>
            <ListItemText primary='DID' />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        <NavLink to='/settings/' style={menulink}>
          <ListItem button>
            <ListItemIcon><IconSettings /></ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItem>
        </NavLink>
      </List>
    </>
  );
}