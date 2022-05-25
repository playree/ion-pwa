import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconHome from '@material-ui/icons/Home';
import IconPerson from '@material-ui/icons/Person'
import IconSettings from '@material-ui/icons/Settings'
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