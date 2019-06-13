import React from "react";
import SelectedDay from "../SelectedDay";
import classes from "./DaySquare.module.css";

const DaySquare = ({
  dayOfWeek,
  month,
  dayOfMonth,
  isSelected,
  isDisabled,
  clickHandler,
  date
}) => {
  let dayClasses = [classes.Day];
  if (isDisabled) dayClasses.push(classes.DayDisabled);

  const onClick = () => {
    clickHandler(date);
  };

  return (
    <div className={classes.DaySquare}>
      <p className={classes.DayOfWeekLabel}>{dayOfWeek}</p>
      <div className={classes.DayContainer}>
        {isSelected ? <SelectedDay label={month} numeral={dayOfMonth} /> : null}
        <div
          className={dayClasses.join(" ")}
          onClick={!isDisabled ? onClick : () => {}}
        >
          <span className={classes.DayLabel}>{dayOfMonth}</span>
        </div>
      </div>
    </div>
  );
};
export { DaySquare as default };
