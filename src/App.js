import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Home from "./pages/home";
import Products from "./pages/products";
import Suppliers from "./pages/suppliers";
import Report from "./pages/report";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

function App() {
  const customTheme = createTheme({
    palette: {
      type: "light",
      primary: {
        light: "#3547E8",
        main: "#242F9B",
        dark: "#151C5C",
      },
    },
  });
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/signIn">
            <SignIn />
          </Route>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/suppliers">
            <Suppliers />
          </Route>
          <Route exact path="/report">
            <Report />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
