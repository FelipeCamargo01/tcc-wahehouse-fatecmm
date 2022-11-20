import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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
import DescriptionIcon from "@material-ui/icons/Description";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import userService from "../services/user.service";

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
  linkStyle: {
    textDecoration: "none",
    color: "#E9E9EB",
    width: "100%",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isProfileMenuOpen = Boolean(anchorEl);

  const [user, setUser] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isLogged, setIsLogged] = useState(null);

  const getUserFromStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      setIsLogged(true);
      userService.verifyIfUserIsAdmin({ id: user.id }).then((response) => {
        if (response) {
          setIsAdminUser(true);
        }
      });
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
    history.push("/signin");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload(true);
  };

  const renderLogin = () => {
    if (user != null) {
      return (
        <Box>
          <Box>
            <Typography
              align="center"
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
          color="primary"
          variant="contained"
          startIcon={<LockOpenIcon />}
          fullWidth
          disableElevation
          onClick={onClickSignIn}
          href="/signIn">
          Login
        </Button>
      );
    }
  };

  const renderNewUserRegister = () => {
    if (isAdminUser) {
      return (
        <ListItem
          button
          component={Link}
          to={"/signUp"}
          style={{ bottom: "5px", position: "absolute" }}>
          <ListItemIcon>
            <PersonAddIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Cadastrar Usuário" />
        </ListItem>
      );
    } else {
      return;
    }
  };

  const renderDrawer = () => {
    if (isLogged) {
      return (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          classes={{ paper: classes.drawerPaper }}>
          <List style={{ height: "100%" }}>
            <ListItem style={{ maxWidth: "100%" }}>
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
            <ListItem button component={Link} to={"/report"}>
              <ListItemIcon>
                <DescriptionIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Relatório" />
            </ListItem>
            {renderNewUserRegister()}
          </List>
        </Drawer>
      );
    } else {
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
          </List>
        </Drawer>
      );
    }
  };

  return <>{renderDrawer()}</>;
}
