import React from "react";
import NavigationItem from "./NavigationItem";
import classes from "./NavigationItems.module.css";
import { Link } from "react-router-dom";
const NavigationItems = ({ isAuthenticated }) => (
  <ul className={classes.NavigationItems}>
    {console.log(isAuthenticated)}
    {isAuthenticated ? (
      <NavigationItem>
        <Link to="/logout">Logout</Link>
      </NavigationItem>
    ) : (
      <NavigationItem>
        <Link to="/signup">Signup</Link>
      </NavigationItem>
    )}
  </ul>
);
export { NavigationItems as default };
