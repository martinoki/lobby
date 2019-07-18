import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import PageLogin from "./pages/login";
import PageGame from "./pages/game";
import PageLobby from "./pages/lobby";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={PageLogin} />
            <Route exact path="/game/:id" component={PageGame} />
            <Route exact path="/lobby" component={PageLobby} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
