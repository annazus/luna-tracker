import React from "react";
import MenuToggle from "../MenuToggle";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems";
import Logo from "../Logo";
const Toolbar = () => (
  <header className={classes.Toolbar}>
    <MenuToggle />
    <Logo />

    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);
export { Toolbar as default };
