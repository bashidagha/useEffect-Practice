import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducer = (prevState, action) =>{

  if(action.type === "INPUT_SET"){
    return {value:action.val, isValid:action.val.includes('@')}
  }

  if(action.type === "INPUT_CHECK"){
    return {value:prevState.value, isValid:prevState.value.includes('@')}
  }

  return {value:'', isValid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail]=useReducer(emailReducer, {value:'', isValid:false});

  useEffect(()=>{

    const identifier = setTimeout(()=>{
      console.log('form validity run')
      setFormIsValid(
        emailState.isValid && enteredPassword.trim().length > 6
      );
    }, 700)

    return ()=>{
      console.log('CLEANUP')
      clearTimeout(identifier)
    }
    
  },[emailState.value, enteredPassword])

  const emailChangeHandler = (event) => {
    dispatchEmail({type:"INPUT_SET", val: event.target.value}) 
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT_CHECK"}) 
  };


  //We update a state base on another state
  //it's ok but sometime it could make an issue
  //we could merge this states
  //we could do this by define an object in useState
  //but when States are bigger it's totally worth to
  //look at useReducer
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            !emailState.isValid ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
