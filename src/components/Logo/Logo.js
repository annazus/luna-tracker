import React from "react";
import LogoImage from "../../assets/images/luna-logo.svg";
import classes from "./Logo.module.css";
const Logo = () => (
  <img src={LogoImage} alt="Luna Tracker Logo" className={classes.Logo} />
);
export { Logo as default };
