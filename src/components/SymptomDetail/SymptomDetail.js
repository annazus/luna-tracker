import React from "react";
import classes from "./SymptomDetail.module.css";
const SymptomDetail = ({ label, selected, clickHandler, className, color }) => {
  const cardClasses = selected
    ? [classes.SymptomTraitCard, classes.SymptomTraitCardSelected]
    : [classes.SymptomTraitCard];

  const labelClasses = selected
    ? [classes.SymptomTraitLabel, classes.SymptomTraitLabelSelected]
    : [classes.SymptomTraitLabel];
  return (
    <div className={[classes.SymptomTrait, className].join(" ")}>
      <div
        className={cardClasses.join(" ")}
        onClick={clickHandler}
        style={
          selected
            ? { backgroundColor: color, borderColor: color }
            : { borderColor: color }
        }
      >
        {selected ? <p className={classes.SymptomTraitDelete}>X</p> : null}
        <p
          className={labelClasses.join(" ")}
          style={!selected ? { color: color } : {}}
        >
          {label}
        </p>
      </div>
    </div>
  );
};
export default SymptomDetail;
