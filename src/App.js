import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/signIn">
            <SignIn />
          </Route>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
