import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import { Paper } from "@material-ui/core";

import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Home from "./pages/home";
import Products from "./pages/products";
import Suppliers from "./pages/suppliers";
import Report from "./pages/report";

function App() {
  return (
    // <Paper style={{ height: "100vh" }}>
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
    // </Paper>
  );
}

export default App;
