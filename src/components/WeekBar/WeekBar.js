import React, { useState, useEffect } from "react";
import moment from "moment";
import DaySquare from "../DaySquare";
import classes from "./WeekBar.module.css";
const WeekBar = ({ selectDayHandler }) => {
  const [today] = useState(moment());
  const [currentDay, setCurrentDay] = useState(moment().format("YYYYMMDD"));
  const [weekStartingDay, setWeekStartingDay] = useState(
    moment()
      .day(0)
      .format("YYYYMMDD")
  );
  const _clickHandler = date => {
    setCurrentDay(date);
    selectDayHandler(date);
  };

  const monthCalculator = weekStartingDay => {
    const startingDay = moment(weekStartingDay);
    const weekEndingDay = moment(startingDay).add(6, "days");
    let header;
    console.log(
      "startingDay",
      startingDay.format("YYYYMMDD"),
      weekEndingDay.format("YYYYMMDD")
    );
    console.log(startingDay.isSame(weekEndingDay, "month"));
    if (startingDay.isSame(weekEndingDay, "month")) {
      header = moment(startingDay).format("MMMM YYYY");
    } else {
      header =
        moment(startingDay).format("MMM") +
        " - " +
        moment(weekEndingDay).format("MMM") +
        " " +
        moment(startingDay).format("YYYY");
    }
    return header;
  };
  const moveOneWeek = (forward = true) => {
    const days = forward ? 7 : -7;
    setWeekStartingDay(
      moment(weekStartingDay)
        .days(days)
        .format("YYYYMMDD")
    );
  };

  const isForwardWeekButtonEnabled = () => {
    if (
      moment(weekStartingDay)
        .days(7)
        .isAfter(moment())
    )
      return false;
    else return true;
  };
  const content = () =>
    ["S", "M", "T", "W", "T", "F", "S"].map((item, i) => {
      return (
        <DaySquare
          key={i}
          dayOfWeek={item}
          month={moment(weekStartingDay)
            .day(i)
            .format("MMM")}
          dayOfMonth={moment(weekStartingDay)
            .day(i)
            .format("D")}
          isSelected={moment(currentDay).isSame(
            moment(weekStartingDay).day(i),
            "day"
          )}
          isDisabled={moment(weekStartingDay)
            .day(i)
            .isAfter(today)}
          clickHandler={_clickHandler}
          date={moment(weekStartingDay)
            .day(i)
            .format("YYYYMMDD")}
        />
      );
    });

  return (
    <div className={classes.WeekBar}>
      <h3 className={classes.Month}>{monthCalculator(weekStartingDay)}</h3>
      <div className={classes.WeekBarControls}>
        <button
          className={classes.WeekBarControl}
          onClick={() => moveOneWeek(false)}
        >
          {"<"}
        </button>
        {isForwardWeekButtonEnabled() ? (
          <button
            className={classes.WeekBarControl}
            onClick={() => moveOneWeek(true)}
          >
            {">"}
          </button>
        ) : null}
      </div>
      <div className={classes.WeekBarDays}> {content()}</div>
    </div>
  );
};

export default WeekBar;
