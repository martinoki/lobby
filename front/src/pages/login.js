import React, { Component } from "react";
import axios from "../axios";

import history from "../utils/history";

import "./login.css";

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
        if(err.response){
          this.setState({ error: err.response.data.error });
        }else{
          // this.setState({error: "Error al conectar: "})
          this.setState({error: JSON.stringify(err)})
        }
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
        <div className="modal">
          <div className="container">
            <div>
              <h2>Bienvenido!</h2>
              <input
                className="input"
                placeholder="Nombre de Usuario"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <br/>
            <div>
              <button className="loginButton" onClick={this.login}>
                Login
              </button>
            </div>
            {this.state.error ? <p className="error">{this.state.error}</p> : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PageHome;
