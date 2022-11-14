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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (localStorage.getItem("user") != null) {
      history.push({
        pathname: "/",
      });
    }
  });

  const onSubmit = (event) => {
    console.log("onsubmit");
    event.preventDefault();
    AuthService.login(email, password)
      .then((data) => {
        console.log(data);
        if(data.message === 'Error') {
          setErrorLogin(true);
        }
        else {
          history.push({
            pathname: "/",
          });
        } 
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
            Não foi possível fazer o seu login! Verifique seu usuário e senha e
            tente novamente.
          </Alert>
        </span>
      );
    }
  };

  return (
    <Container maxWidth="sm" align="center" style={{ paddingTop: "5rem" }}>
      <Typography
        marginBottom={"3rem"}
        align="center"
        component="h1"
        variant="h5"
        style={{ marginBottom: "2rem" }}>
        Faça seu Login
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid
          container
          spacing={2}
          xs={12}
          alignItems="center"
          style={{ marginBottom: "2rem" }}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="E-mail"
              fullWidth
              id="email"
              size="small"
              autoComplete="email"
              autoFocus
              required
              onChange={(e) => setEmail(e.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Senha"
              type="password"
              fullWidth
              id="password"
              size="small"
              autoComplete="current-password"
              required
              onChange={(e) => setPassword(e.target.value)}></TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row" justifyContent="center">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation>
              login
            </Button>
          </Grid>
          <Grid item>
            <Button
              href="/signup"
              variant="contained"
              color="inherit"
              disableElevation>
              cadastrar
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box mt={4}>{renderErrorLogin()}</Box>
    </Container>
  );
}
