import React, { useImperativeHandle, useRef } from "react";
import "./input.scss";

const Input = React.forwardRef((props, ref) => {
  // In React, data is passed from parent to child components via props, known as unidirectional data flow. The parent component cannot directly call a function defined in the child component or reach down to grab a value for itself.
  // In certain circumstances, we want our parent component to reach down to the child component, getting data that originates in the child component for its own use. We can achieve this type of data flow with the useImperativeHandle Hook, which allows us to expose a value, state, or function inside a child component to the parent component through ref
  //https://blog.logrocket.com/underrated-react-hooks-youre-missing-out-on/#:~:text=React%20useImperativeHandle%20Hook,grab%20a%20value%20for%20itself.
  //above link explain about useImperativeHandle
  //it's rarely used but in such this situation is useful

  const inputRef = useRef();

  const activate = ()=>{
      //default javascript function for input DOM
      inputRef.current.focus();
  }

  useImperativeHandle(ref,()=>{
    return {
        myFocus: activate
    }
  })

  return (
    <div
      className={`control ${props.State.isValid === false ? "invalid" : ""}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        ref={inputRef}
        value={props.State.value}
        onChange={props.changeHandler}
        onBlur={props.validateHandler}
      />
    </div>
  );
});

export default Input;
