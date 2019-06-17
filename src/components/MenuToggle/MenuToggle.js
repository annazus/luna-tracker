import React from "react";
import classes from "./MenuToggle.module.css";
const MenuToggle = ({ clickHandler }) => (
  <div className={classes.MenuToggle} onClick={clickHandler}>
    <div />
    <div />
    <div />
  </div>
);
export { MenuToggle as default };
