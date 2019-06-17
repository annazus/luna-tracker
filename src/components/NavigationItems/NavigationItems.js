import React from "react";
import NavigationItem from "./NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem>Main</NavigationItem>
    <NavigationItem>Login</NavigationItem>
    <NavigationItem>Logout</NavigationItem>
  </ul>
);
export { NavigationItems as default };
