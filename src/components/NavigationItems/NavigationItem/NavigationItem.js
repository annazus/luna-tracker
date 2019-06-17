import React from "react";
import classes from "./NavigationItem.module.css";

const NavigationItem = ({ children }) => (
  <li className={classes.NavigationItem}>{children}</li>
);
export { NavigationItem as default };
