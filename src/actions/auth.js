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

const setAuthSuccess = (dispatch, token) => {
  window.localStorage.setItem("token", token);
  // window.localStorage.setItem("expirationDate", expirationDate);
  // const expiresIn = expirationDate - moment();
  // checkAuthTimeout(dispatch, expiresIn);
  dispatch(authSuccess());
};

const authenticate = async (dispatch, isSignup, { name, email, password }) => {
  const client = getClient();
  dispatch(authStart());
  try {
    const variables = { name, email, password };
    const authResponse = await client.mutate({
      variables,
      mutation: isSignup ? SIGNUP_MUTATION : LOGIN_MUTATION
    });
    setAuthSuccess(
      dispatch,
      isSignup
        ? authResponse.data.createUser.token
        : authResponse.data.loginUser.token,
      moment().add(7, "days")
    );
  } catch (error) {
    dispatch(authFail(error.message));
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

export { actionTypes, authenticate, logout, checkAuthState };
