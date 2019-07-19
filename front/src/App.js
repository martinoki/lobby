import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import PageLogin from "./pages/login";
import PageGame from "./pages/game";
import PageLobby from "./pages/lobby";
// import socketIOClient from "socket.io-client";
// import webSocket from "../src/webSocket";

class App extends Component {
  // componentDidMount() {
  //  webSocket.on("connect", function() {
  //     console.log("connected!");
  //     webSocket.emit("greet", { message: "Hello Mr.Server!" });
  //   });

  //   webSocket.on("respond", function(data) {
  //     console.log(data);
  //   });
    // socket.on("FromAPI", data => this.setState({ response: data }));
  // }
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
