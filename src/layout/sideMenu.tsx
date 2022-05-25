import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconHome from '@material-ui/icons/Home';
import { NavLink } from "react-router-dom";

export const SideMenu = () => {
  return (
    <>
      <List>
        <NavLink to='/'>
          <ListItem button>
            <ListItemIcon><IconHome /></ListItemIcon>
            <ListItemText primary='Top' />
          </ListItem>
        </NavLink>
        <NavLink to='/did/'>
          <ListItem button>
            <ListItemIcon><IconHome /></ListItemIcon>
            <ListItemText primary='DID' />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        
      </List>
    </>
  );
}