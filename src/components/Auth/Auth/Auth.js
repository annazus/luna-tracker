import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import classes from "./Auth.module.css";
import Loader from "../../Loader";
import SymptomsContext from "../../../SymptomsContext";
import { authenticate } from "../../../actions";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [authForm, setauthForm] = useState({
    name: "",
    password: "",
    email: "",
    error: ""
  });

  const { state, dispatch } = useContext(SymptomsContext);

  const onChangeHandler = e => {
    e.preventDefault();
    setauthForm({ ...authForm, [e.target.name]: e.target.value, error: "" });
  };

  const validateForm = e => {
    if (isSignup & !authForm.name.trim()) {
      setauthForm({ ...authForm, error: "Your name is required." });
      return false;
    }
    if (!authForm.email.trim()) {
      setauthForm({ ...authForm, error: "Dont forget to add your email." });
      return false;
    }
    if (!authForm.password.trim()) {
      setauthForm({ ...authForm, error: "Don't forget to add your password." });
      return false;
    }
    return true;
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    await authenticate(dispatch, isSignup, authForm);
  };

  const switchAuthModeHandler = isSignup => {
    setIsSignup(isSignup);
  };

  let errorMessage = null;
  let authRedirect = null;
  if (authForm.error) {
    errorMessage = <p className={classes.Error}>{authForm.error}</p>;
  } else if (state.error)
    errorMessage = <p className={classes.Error}>{state.error}</p>;
  if (state.isAuth) authRedirect = <Redirect to="/" />;

  if (state.loading) {
    console.log("loading");
  } else if (state.isAuth) {
    console.log("success");
  }

  const inviteMessage = (
    <>
      {isSignup ? "Have an account?" : "No account?"}{" "}
      <button
        className={classes.ButtonAsLink}
        onClick={e => {
          e.preventDefault();
          switchAuthModeHandler(!isSignup);
        }}
      >
        {isSignup ? "Login" : "Sign up"}{" "}
      </button>
    </>
  );

  return state.loading ? (
    <Loader />
  ) : (
    <form className={classes.Auth} onSubmit={onSubmitHandler}>
      {authRedirect}
      {errorMessage}
      {isSignup ? (
        <div className={classes.Row}>
          <label htmlFor="name" className={classes.Label}>
            Name:
          </label>
          <input
            type="name"
            id="name"
            name="name"
            value={authForm.name}
            placeholder="Name"
            className={classes.Input}
            onChange={onChangeHandler}
          />
        </div>
      ) : null}
      <div className={classes.Row}>
        <label htmlFor="email" className={classes.Label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={authForm.email}
          name="email"
          placeholder="Email address"
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
          value={authForm.password}
          placeholder="Password"
          name="password"
          className={classes.Input}
          onChange={onChangeHandler}
        />
      </div>
      <div className={classes.Row}>
        <button className={classes.Button}>Submit</button>
      </div>
      <div className={classes.Row}>
        <p className={classes.InviteMessage}>{inviteMessage}</p>
      </div>
    </form>
  );
};
export { Auth as default };
