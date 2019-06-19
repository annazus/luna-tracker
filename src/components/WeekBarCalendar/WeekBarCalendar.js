import React from "react";
import DaySquare from "../DaySquare";
import classes from "./WeekBarCalendar.module.css";
const WeekBarCalendar = ({ today, week, selectCurrentDateHandler }) => {
  const content = () =>
    week.map((item, i) => {
      return (
        <DaySquare
          key={i}
          dayOfWeek={item.dayOfWeek}
          month={item.month}
          dayOfMonth={item.dayOfMonth}
          isSelected={item.isSelected}
          isDisabled={item.isDisabled}
          clickHandler={selectCurrentDateHandler}
          date={item.date}
        />
      );
    });

  return <div className={classes.WeekBarCalendar}> {content()}</div>;
};

export default WeekBarCalendar;
