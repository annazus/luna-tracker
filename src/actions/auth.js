import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../graphql/mutations";
import getClient from "../useClient";
export const LOGIN_RESPONSE = "LOGIN_RESPONSE";
export const SIGNUP_RESPONSE = "SIGNUP_RESPONSE";
export const LOGOUT = "LOGOUT";

const signup = async (dispatch, name, email, password) => {
  const client = getClient();
  const variables = {
    name,
    email,
    password
  };

  const signupResponse = await client.mutate({
    variables,
    mutation: SIGNUP_MUTATION
  });

  window.localStorage.setItem("token", signupResponse.data.createUser.token);

  dispatch({
    type: SIGNUP_RESPONSE
  });
};

const login = async (dispatch, email, password) => {
  const client = getClient();

  const variables = {
    email,
    password
  };
  const loginResponse = await client.mutate({
    variables,
    mutation: LOGIN_MUTATION
  });
  window.localStorage.setItem("token", loginResponse.data.loginUser.token);

  dispatch({
    type: LOGIN_RESPONSE
  });
};
const logout = dispatch => {
  window.localStorage.removeItem("token");
  dispatch({
    type: LOGOUT
  });
  const client = getClient();
  client.resetStore();
};

export { login, logout, signup };
