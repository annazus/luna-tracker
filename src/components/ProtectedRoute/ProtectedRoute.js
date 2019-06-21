import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import SymptomsContext from "../../SymptomsContext";
const ProtectedRoute = props => {
  const { state } = useContext(SymptomsContext);

  if (state.isAuth) {
    return <Route {...props} />;
  } else return <Redirect to="/auth" />;
};

export { ProtectedRoute as default };
