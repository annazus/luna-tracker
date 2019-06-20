import moment from "moment";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../graphql/mutations";
import getClient from "../useClient";

const actionTypes = {
  AUTH_START: "AUTH_START",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_LOGOUT: "AUTH_LOGOUT",
  AUTH_FAIL: "AUTH_FAIL"
};

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  payload: error
});

const authSuccess = () => ({
  type: actionTypes.AUTH_SUCCESS
});

const authLogout = () => ({
  type: actionTypes.AUTH_LOGOUT
});

const setAuthState = (dispatch, token) => {
  console.log("setAuthState", token);
  window.localStorage.setItem("token", token);
  // window.localStorage.setItem("expirationDate", expirationDate);
  // const expiresIn = expirationDate - moment();
  // console.log(expiresIn);
  // checkAuthTimeout(dispatch, expiresIn);
  dispatch(authSuccess());
};

const signup = async (dispatch, name, email, password) => {
  const client = getClient();
  dispatch(authStart());
  try {
    const variables = {
      name,
      email,
      password
    };
    const signupResponse = await client.mutate({
      variables,
      mutation: SIGNUP_MUTATION
    });
    setAuthState(
      dispatch,
      signupResponse.data.createUser.token,
      moment().add(7, "days")
    );
    authSuccess(dispatch);
  } catch (error) {
    dispatch(authFail(error));
  }
};

const login = async (dispatch, email, password) => {
  const client = getClient();
  dispatch(authStart());
  try {
    const variables = {
      email,
      password
    };
    const loginResponse = await client.mutate({
      variables,
      mutation: LOGIN_MUTATION
    });
    console.log(loginResponse);
    setAuthState(dispatch, loginResponse.data.loginUser.token);
  } catch (error) {
    console.log(error);

    dispatch(authFail(error));
  }
};

const logout = dispatch => {
  const client = getClient();
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  client.resetStore();
  dispatch(authLogout());
};

const checkAuthState = dispatch => {
  const token = localStorage.getItem("token");
  if (!token) {
    logout(dispatch);
  } else {
    const expirationDate = moment(localStorage.getItem("expirationDate"));
    if (expirationDate <= moment()) {
      const expiresIn = expirationDate - new Date();
      logout(dispatch);
      checkAuthTimeout(dispatch, expiresIn);
    } else {
      dispatch({
        type: actionTypes.AUTH_SUCCESS
      });
    }
  }
};

const checkAuthTimeout = (dispatch, expirationTime) => {
  setTimeout(() => {
    logout(dispatch);
  }, expirationTime * 1000);
};

export { actionTypes, signup, login, logout, checkAuthState };
