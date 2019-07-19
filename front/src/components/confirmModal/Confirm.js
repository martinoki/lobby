import React from "react";
import "./Confirm.css";

const Confirm = props => (
  <div className="modal">
    <div className="container">
      <div>{props.children}</div>
      
      <br />

      <div>
        <button className="button" onClick={props.okClick}>
          {props.okText}
        </button>
        <button className="button" onClick={props.cancelClick}>
          {props.cancelText}
        </button>
      </div>
    </div>
  </div>
);

export default Confirm;
