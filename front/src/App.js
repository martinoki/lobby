import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "./utils/history";
import PageHome from "./pages/home";
import PageUsers from "./pages/users";
import PagePosts from "./pages/posts";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={PageHome} />
            <Route exact path="/users" component={PageUsers} />
            <Route exact path="/posts" component={PagePosts} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
