import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import '../Styles/Components/DashboardSidebar.css';

function DashboardSidebar() {
  return (
    <div className="sidebar">
      <List>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/dashboard/stats">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/dashboard/products">
            <ListItemIcon><InventoryIcon /></ListItemIcon>
            <ListItemText primary="Manage Products" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/dashboard/users">
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

export default DashboardSidebar;