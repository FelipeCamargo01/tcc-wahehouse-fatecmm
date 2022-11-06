import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleAlt from "@material-ui/icons/PeopleAlt";
import ListAlt from "@material-ui/icons/ListAlt";
import { Link } from "react-router-dom";

require("./css/navbar.css");

const useStyles = makeStyles((theme) => ({
  profileName: {
    cursor: "pointer",
  },
  drawer: {
    width: 240,
  },
  drawerPaper: {
    width: 240,
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isProfileMenuOpen = Boolean(anchorEl);

  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(null);

  const getUserFromStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      setIsLogged(true);
    } else {
      setUser(null);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    getUserFromStorage();
  }, [isLogged]);

  const onClickSignIn = () => {
    props.onLogin();
    history.push({
      pathname: "/signin",
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("user");
    props.onLogout();
  };

  const renderLogin = () => {
    if (user != null) {
      return (
        <Box>
          <Box>
            <Typography
              variant="h6"
              className={classes.profileName}
              component="h6"
              onClick={handleClick}>
              {user?.firstName} {user?.lastName}
            </Typography>
          </Box>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={isProfileMenuOpen}
            onClose={() => {
              handleClose();
            }}
            PaperProps={{
              style: {
                width: "20ch",
              },
            }}>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Box>
      );
    } else {
      return (
        <Button
          variant="outlined"
          onClick={onClickSignIn}
          className={classes.loginButton}>
          <a className={classes.linkStyle} href="/signin">
            Login
          </a>
        </Button>
      );
    }
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.drawerPaper }}>
      <List>
        <ListItem>
          <ListItemText primary={renderLogin()} />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to={"/"}>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to={"/products"}>
          <ListItemIcon>
            <ListAlt color="primary" />
          </ListItemIcon>
          <ListItemText primary="Produtos" />
        </ListItem>
        <ListItem button component={Link} to={"/suppliers"}>
          <ListItemIcon>
            <PeopleAlt color="primary" />
          </ListItemIcon>
          <ListItemText primary="Fornecedores" />
        </ListItem>
      </List>
    </Drawer>
  );
}
