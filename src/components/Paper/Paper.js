import React from "react";
import classes from "./Paper.module.css";
const Paper = ({ children }) => {
  return <div className={classes.Paper}>{children}</div>;
};
export default Paper;
