import React from "react";
import NavigationItem from "./NavigationItem";
import classes from "./NavigationItems.module.css";
import { Link } from "react-router-dom";
const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem>
      <Link to="/login">Login</Link>
    </NavigationItem>
    <NavigationItem>
      <Link to="/signup">Signup</Link>
    </NavigationItem>
    <NavigationItem>
      <Link to="/" exact>
        Tracker
      </Link>
    </NavigationItem>
    <NavigationItem>
      <Link to="/logout">Logout</Link>
    </NavigationItem>
  </ul>
);
export { NavigationItems as default };
