import React from "react";
import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";
import Main from "./Screens/Main";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/" exact>
            <Main />
          </Route>
        </div>
      </Switch>
    </Router>
  );
};

export default App;
