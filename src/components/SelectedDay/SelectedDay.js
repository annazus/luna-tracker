import React from "react";
import classes from "./SelectedDay.module.css";
const SelectedDay = ({ label, numeral }) => {
  return (
    <div className={classes.selectedDay}>
      <span className={classes.label}>{label}</span>
      <span className={classes.numeral}>{numeral}</span>
    </div>
  );
};
export default SelectedDay;
