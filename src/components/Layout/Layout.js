import React, { useContext } from "react";
import Toolbar from "../Toolbar";
import classes from "./Layout.module.css";
import SymptomsContext from "../../SymptomsContext";
const Layout = ({ children }) => {
  const { state } = useContext(SymptomsContext);
  return (
    <>
      <Toolbar isAuthenticated={state.isAuth} />
      <main className={classes.Content}>{children}</main>
    </>
  );
};
export { Layout as default };
