import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { logout } from "../../../actions";
import SymptomsContext from "../../../SymptomsContext";

const Logout = () => {
  const { dispatch } = useContext(SymptomsContext);

  logout(dispatch);
  return <Redirect to="/auth" />;
};

export { Logout as default };
