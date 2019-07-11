import React, { Component } from "react";

import history from "../utils/history";

class PageHome extends Component {
  gotoUsers() {
    history.push("/users");
  }

  gotoPosts() {
    history.push("/posts");
  }

  render() {
    return (
      <React.Fragment>
        <h1>Home</h1>
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
        </ul>
      </React.Fragment>
    );
  }
}

export default PageHome;
