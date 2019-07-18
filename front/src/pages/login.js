import React, { Component } from "react";
import axios from "../axios";

import history from "../utils/history";

class PageHome extends Component {
  state = {
    username: null,
    error: null
  };

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      history.push("/");
    }
  }

  gotoUsers() {
    history.push("/users");
  }

  gotoLobby() {
    history.push("/lobby");
  }

  onChange = e => {
    const value = e.target.value;
    this.setState({ username: value });
  };

  login = () => {
    this.setState({ error: null });
    if (!this.state.username) {
      this.setState({ error: "Ingrese el nombre de usuario." });
      return;
    }
    axios
      .post("/lobby/login", { username: this.state.username })
      .then(response => {
        localStorage.setItem("userId", response.data._id);
        this.gotoLobby();
      })
      .catch(err => {
        this.setState({ error: err.response.data.error });
      });
  };

  render() {
    return (
      <React.Fragment>
        {/* <h1>Home</h1>
        <ul>
          <li>
            <button type="button" onClick={() => this.gotoUsers()}>
              Users
            </button>
          </li>
          <li>
            <button type="button" onClick={() => this.gotoPosts()}>
              Posts
            </button>
          </li>
        </ul> */}
        <input
          placeholder="Nombre de Usuario"
          value={this.state.name}
          onChange={this.onChange}
        />
        <button onClick={this.login}>Login</button>
        {this.state.error ? <p>{this.state.error}</p> : null}
      </React.Fragment>
    );
  }
}

export default PageHome;
