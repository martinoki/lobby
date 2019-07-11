import React, { Component } from "react";

import history from "../utils/history";

class PagePosts extends Component {
  gotoBack() {
    history.push("/");
  }

  render() {
    return (
      <React.Fragment>
        <h1>Posts</h1>
        <button type="button" onClick={() => this.gotoBack()}>
          Back
        </button>
      </React.Fragment>
    );
  }
}

export default PagePosts;
