import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthService from "../services/auth.service";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if(localStorage.getItem('user') != null) {
      history.push({
        pathname: "/",
      });
    }
  })

  const onSubmit = (event) => {
    console.log('onsubmit');
    event.preventDefault();
    AuthService.login(email, password)
      .then((data) => {
        console.log(data);
        history.push({
          pathname: "/",
        });
      })
      .catch((error) => {
        setErrorLogin(true);
        // removeErrorLogin();
      });
  };

  const renderErrorLogin = () => {
    if (errorLogin) {
      return (
        <span>
          <Alert severity="error">
            Não foi possível fazer o seu login! Verifique seu usuário e senha e tente novamente.
          </Alert>
        </span>
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Faça seu Login
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid justifyContent="center" container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Não tem uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Box mt={4}>{renderErrorLogin()}</Box>
      </div>
    </Container>
  );
}
