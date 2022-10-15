import React, { useState } from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navbarColor: {
    backgroundColor: "#19262E",
  },
  title: {
    fontWeight: "bold",
    flexGrow: 1,
  },
  loginButton: {
    "&:hover": {
      border: "1px solid #E9E9EB",
      //   backgroundColor: "white",
    },
    width: "150px",
    fontSize: "15px",
    borderRadius: "10px",
    color: "white",
    border: "1px solid white",
  },
  linkStyle: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    "&:hover": {
      color: "#E9E9EB",
    },
  },
  profileName: {
    cursor: "pointer",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isProfileMenuOpen = Boolean(anchorEl);

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
    if (props.user != null) {
      return (
        <Box>
          <Box>
            <Typography
              variant="h5"
              className={classes.profileName}
              component="h5"
              onClick={handleClick}
            >
              {props.user?.firstName} {props.user?.lastName}
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
            }}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Box>
      );
    } else {
      return (
        <Button
          variant="outlined"
          onClick={onClickSignIn}
          className={classes.loginButton}
        >
          <a className={classes.linkStyle} href="/signin">
            Login
          </a>
        </Button>
      );
    }
  };

  const renderMenuButtons = () => {
    if (props.isLogged) {
      return (
        <Box>
          <Button onClick={() => { props.onChangeScreen('Home') }} color="inherit">Home</Button>
          <Button onClick={() => { props.onChangeScreen('Fornecedores') }} color="inherit">Fornecedores</Button>
          <Button onClick={() => { props.onChangeScreen('Produtos') }} color="inherit">Produtos</Button>
          <Button onClick={() => { props.onChangeScreen('Movimentação') }} color="inherit">Movimentações</Button>
        </Box>
      );
    } else {
      return;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.navbarColor} position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>{renderMenuButtons()}</Grid>
            <Grid item>{renderLogin()}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
