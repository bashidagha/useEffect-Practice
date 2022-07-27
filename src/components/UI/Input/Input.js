import React from "react";
import "./input.scss";

const Input = (props) => {
  return (
    <div
      className={`control ${
        props.State.isValid === false ? 'invalid' : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.State.value}
        onChange={props.changeHandler}
        onBlur={props.validateHandler}
      />
    </div>
  );
};

export default Input;
