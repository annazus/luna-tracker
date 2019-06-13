import React from "react";
import classes from "./SymptomTrait.module.css";
const SymptomTrait = ({ label, selected, clickHandler, className }) => {
  const cardClasses = selected
    ? [classes.SymptomTraitCard, classes.SymptomTraitCardSelected]
    : [classes.SymptomTraitCard];

  const labelClasses = selected
    ? [classes.SymptomTraitLabel, classes.SymptomTraitLabelSelected]
    : [classes.SymptomTraitLabel];
  return (
    <div className={[classes.SymptomTrait, className].join(" ")}>
      <div className={cardClasses.join(" ")} onClick={clickHandler}>
        {selected ? <p className={classes.SymptomTraitDelete}>X</p> : null}
        <p className={labelClasses.join(" ")}>{label}</p>
      </div>
    </div>
  );
};
export default SymptomTrait;
