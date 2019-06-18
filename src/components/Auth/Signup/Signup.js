import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import classes from "./Signup.module.css";
import SymptomsContext from "../../../SymptomsContext";
import { signup } from "../../../actions";
const Signup = () => {
  const [signupform, setSignupForm] = useState({
    name: "",
    password: "",
    email: ""
  });

  const { state, dispatch } = useContext(SymptomsContext);

  const onChangeHandler = e => {
    e.preventDefault();
    setSignupForm({ ...signupform, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    signup(dispatch, signupform.name, signupform.email, signupform.password);
    console.log(signupform);
  };
  return state.isAuth ? (
    <Redirect to="/" />
  ) : (
    <form className={classes.Signup} onSubmit={onSubmitHandler}>
      <div className={classes.Row}>
        <label htmlFor="name" className={classes.Label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={classes.Input}
          onChange={onChangeHandler}
        />
      </div>
      <div className={classes.Row}>
        <label htmlFor="email" className={classes.Label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={classes.Input}
          onChange={onChangeHandler}
        />
      </div>
      <div className={classes.Row}>
        <label htmlFor="password" className={classes.Label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={classes.Input}
          onChange={onChangeHandler}
        />
      </div>
      <div className={classes.Buttons}>
        <button className={classes.Button}>Cancel</button>
        <button className={classes.Button}>Submit</button>
      </div>
    </form>
  );
};
export { Signup as default };
