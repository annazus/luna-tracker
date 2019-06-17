import React from "react";
import Toolbar from "../Toolbar";
import classes from "./Layout.module.css";

const Layout = ({ children }) => (
  <>
    <Toolbar />
    <main className={classes.Content}>{children}</main>
  </>
);
export { Layout as default };
