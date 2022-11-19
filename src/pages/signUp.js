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
import { Box } from "@material-ui/core";
import AuthService from "../services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";
import userService from "../services/user.service";
import Navbar from "./navbar";

export default function SignUp(props) {
  const history = useHistory();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [isAdminUser, setIsAdminUser] = useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("user") == null) {
      history.push("/");
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
              history.push("/");
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
    <Box display="flex" flexDirection="row">
      <Navbar />
      <Container maxWidth="sm" align="center" style={{ paddingTop: "5rem" }}>
        <Typography
          textAlign="center"
          component="h1"
          variant="h5"
          style={{ marginBottom: "2rem" }}>
          Cadastrar Usuário
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
                value={firstName}
                label="Nome"
                type="text"
                fullWidth
                size="small"
                autoFocus
                required
                onChange={(e) => setFirstName(e.target.value)}></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={lastName}
                label="Sobrenome"
                type="text"
                fullWidth
                size="small"
                required
                onChange={(e) => setLastName(e.target.value)}></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                value={email}
                label="E-mail"
                fullWidth
                type="email"
                size="small"
                required
                onChange={(e) => setEmail(e.target.value)}></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                value={password}
                label="Senha"
                fullWidth
                type="password"
                size="small"
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
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    </Box>
  );
}
