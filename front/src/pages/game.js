import React, { Component } from "react";

import history from "../utils/history";

class PageUsers extends Component {
  gotoBack() {
    history.push("/");
  }

  

  componentDidMount(){
    console.log("props: ", this.props.match.params.id)
  }

  render() {
    return (
      <React.Fragment>
        <h1>JUEGOOO</h1>
        <button type="button" onClick={() => this.gotoBack()}>
          Back
        </button>
      </React.Fragment>
    );
  }
}

export default PageUsers;
