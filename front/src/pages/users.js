import React, { Component } from "react";

import history from "../utils/history";

class PageUsers extends Component {
  gotoBack() {
    history.push("/");
  }

  render() {
    return (
      <React.Fragment>
        <h1>Users</h1>
        <button type="button" onClick={() => this.gotoBack()}>
          Back
        </button>
      </React.Fragment>
    );
  }
}

export default PageUsers;
