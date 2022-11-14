import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthService from "../services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";
import userService from "../services/user.service";

export default function SignUp(props) {
  const history = useHistory();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isAdminUser, setIsAdminUser] = useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("user") == null) {
      history.push("/signIn");
    }
    if (localStorage.getItem("user") != null) {
      let user = JSON.parse(localStorage.getItem("user"));
      userService.verifyIfUserIsAdmin({ id: user.id }).then((response) => {
        if (response) {
          setIsAdminUser(true);
        } else {
          history.push("/");
        }
      });
    }
  });

  const onSubmit = (event) => {
    event.preventDefault();
    AuthService.register({
      password: password,
      lastName: lastName,
      firstName: firstName,
      email: email,
    })
      .then((response) => {
        if (response.data) {
          if (response.data.message === "Error") {
            toast.error(response.data.data);
          } else {
            if (isAdminUser) {
              toast.success("Usuário criado com sucesso!");
              document.getElementById("signup-form").reset();
            } else {
              if (response.data.data?.accessToken) {
                localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.data)
                );
              }
              history.push({
                pathname: "/",
              });
            }
          }
        } else {
          toast.error(response.toString());
        }
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  return (
    <Container maxWidth="sm" align="center" style={{ paddingTop: "5rem" }}>
      <Typography
        textAlign="center"
        component="h1"
        variant="h5"
        style={{ marginBottom: "2rem" }}>
        Cadastre-se
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
              label="Nome"
              fullWidth
              size="small"
              autoFocus
              required
              onChange={(e) => setFirstName(e.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Sobrenome"
              fullWidth
              size="small"
              required
              onChange={(e) => setLastName(e.target.value)}></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="E-mail"
              fullWidth
              size="small"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Senha"
              fullWidth
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
              Cadastrar
            </Button>
          </Grid>
          <Grid item>
            <Button
              href="/signin"
              variant="contained"
              color="inherit"
              disableElevation>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
