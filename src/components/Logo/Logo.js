import React from "react";
import LogoImage from "../../assets/images/luna-logo.svg";
import classes from "./Logo.module.css";
const Logo = () => (
  <div className={classes.Logo}>
    <img src={LogoImage} alt="Luna Tracker Logo" />
    <h3 className={classes.Title}>Luna Tracker </h3>
  </div>
);
export { Logo as default };
