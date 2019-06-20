import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import SymptomContext from "../../SymptomsContext";
import classes from "./WeekBar.module.css";
import { selectDate } from "../../actions/actions";
const WeekBar = ({ children, updateWeek }) => {
  const [today] = useState(moment().format("YYYYMMDD"));

  const [weekStartingDay, setWeekStartingDay] = useState(
    moment()
      .day(0)
      .format("YYYYMMDD")
  );

  const { dispatch, state } = useContext(SymptomContext);

  useEffect(() => {
    selectCurrentDateHandler(today);
    if (updateWeek) {
      console.log("weekStartingDay", weekStartingDay);
      updateWeek(createWeek());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCurrentDateHandler = date => {
    selectDate(dispatch, date);
    console.log(date);
  };

  const createCalendarHeader = weekStartingDay => {
    const startingDay = moment(weekStartingDay);
    const weekEndingDay = moment(startingDay).add(6, "days");

    let header;

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

  const createWeek = () =>
    ["S", "M", "T", "W", "T", "F", "S"].map((item, i) => ({
      key: i,
      dayOfWeek: item,

      month: moment(weekStartingDay)
        .day(i)
        .format("MMM"),
      dayOfMonth: moment(weekStartingDay)
        .day(i)
        .format("D"),
      isSelected: moment(state.selectedDate).isSame(
        moment(weekStartingDay).day(i),
        "day"
      ),
      isDisabled: moment(weekStartingDay)
        .day(i)
        .isAfter(today),
      date: moment(weekStartingDay)
        .day(i)
        .format("YYYYMMDD")
    }));

  const moveOneWeek = (forward = true) => {
    const days = forward ? 7 : -7;
    setWeekStartingDay(
      moment(weekStartingDay)
        .days(days)
        .format("YYYYMMDD")
    );
    updateWeek(createWeek());
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

  return (
    <div className={classes.WeekBar}>
      <h3 className={classes.Month}>{createCalendarHeader(weekStartingDay)}</h3>
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
      {React.cloneElement(children, {
        today,
        week: createWeek(),
        selectCurrentDateHandler: selectCurrentDateHandler
      })}
    </div>
  );
};

export default WeekBar;
