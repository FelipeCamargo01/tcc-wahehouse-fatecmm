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

require("./css/navbar.css");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navbarColor: {
    backgroundColor: "#00C1F5",
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
    window.location.reload(true)
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
              onClick={handleClick}
            >
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

  const onChangeScreenClick = (screen) => {
    // props.onChangeScreen(screen);
    removeRemoveActiveButton();
    setActiveButton(screen);
  }

  const removeRemoveActiveButton = () => {
    let parentElement = document.getElementById("buttons-list");
    let childElements = parentElement.children;
    
    for (let i = 0; i < childElements.length; i++) {
      childElements[i].classList.remove("active");
    }
  }

  const setActiveButton = (button) => {
    document.getElementById(button).classList.add("active");
  }

  const renderMenuButtons = () => {
    if (isLogged) {
      return (
        <Box id="buttons-list">
          <Button id="Home" onClick={() => { navigateTo(''); onChangeScreenClick('Home') }} color="inherit">Home</Button>
          <Button id="Fornecedores" onClick={() => { navigateTo('suppliers') }} color="inherit">Fornecedores</Button>
          <Button id="Produtos" onClick={() => { navigateTo('products') }} color="inherit">Produtos</Button>
        </Box>
      );
    } else {
      return;
    }
  };

  const navigateTo = (screen) =>{
    history.push({
      pathname: `/${screen}`,
    });
  }

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
