import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import classes from "./Login.module.css";
import SymptomsContext from "../../../SymptomsContext";
import { login } from "../../../actions";
const Login = () => {
  const [loginForm, setLoginForm] = useState({
    password: "",
    email: ""
  });

  const { state, dispatch } = useContext(SymptomsContext);
  const [showTest, setShowTest] = useState(false);

  const onChangeHandler = e => {
    e.preventDefault();
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    login(dispatch, loginForm.email, loginForm.password);
    console.log(loginForm);
    setShowTest(true);
  };
  return state.isAuth ? (
    <Redirect to="/" />
  ) : (
    <form className={classes.Login} onSubmit={onSubmitHandler}>
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
export { Login as default };
