import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Theme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  appBar: {
    marginBottom: useTheme().spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const Header = () => {
  const navigate = useHistory();
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery('(min-width:600px)')

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const Logout = () =>{
    localStorage.clear("token");
    navigate.push("/login")
  }

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
            {
                !isMobile ?(
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon />
                </IconButton>
                ) : null
            }
          <Typography variant="h6">XYZ Marketplace</Typography>
          {isMobile ? (
            <div>
              <Link to="/customer" className={classes.link}>
                <Button color="inherit">Customer</Button>
              </Link>
              <Link to="/orders" className={classes.link}>
                <Button color="inherit">Orders</Button>
              </Link>
              <Link className={classes.link}>
                <Button onClick={Logout} color="inherit">Logout</Button>
              </Link>
              {/* Add more navigation links as needed */}
            </div>
          ) : null}
        </Toolbar>
      </AppBar>

      {/* Responsive Drawer */}
      <Drawer
        open={openDrawer}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <ListItem button key="Customer" component={Link} to="/customer" onClick={handleDrawerClose}>
            <ListItemText primary="Customer" />
          </ListItem>
          <ListItem button key="orders" component={Link} to="/orders" onClick={handleDrawerClose}>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button key="logout"  onClick={Logout}>
            <ListItemText primary="Logout" />
          </ListItem>
          {/* Add more drawer items as needed */}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;