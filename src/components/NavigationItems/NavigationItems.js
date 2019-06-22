import React from "react";
import NavigationItem from "./NavigationItem";
import classes from "./NavigationItems.module.css";
import { NavLink } from "react-router-dom";
const NavigationItems = ({ isAuthenticated }) => (
  <ul className={classes.NavigationItems}>
    {console.log(isAuthenticated)}
    {isAuthenticated ? (
      <>
        <NavigationItem>
          <NavLink
            exact
            to="/"
            activeStyle={{
              fontWeight: "bold"
            }}
          >
            Track
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink
            to="/history"
            activeStyle={{
              fontWeight: "bold"
            }}
          >
            History
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink
            to="/logout"
            activeStyle={{
              fontWeight: "bold"
            }}
          >
            Logout
          </NavLink>
        </NavigationItem>
      </>
    ) : null}
  </ul>
);
export { NavigationItems as default };
