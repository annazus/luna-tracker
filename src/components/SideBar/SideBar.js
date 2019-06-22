import React from "react";
import NavigationItems from "../NavigationItems";
import classes from "./SideBar.module.css";
const BackDrop = ({ onClickHandler, children }) => {
  return (
    <div onClick={onClickHandler} className={classes.BackDrop}>
      {children}
    </div>
  );
};

const SideBar = ({ isAuthenticated, hideSideBarHandler }) => {
  return (
    <BackDrop onClickHandler={hideSideBarHandler}>
      <div className={classes.SideBar}>
        <div className={classes.Separator} />
        <NavigationItems isAuthenticated={isAuthenticated} />
      </div>
    </BackDrop>
  );
};

export default SideBar;
