import React from "react";
import classes from "./Symptom.module.css";
const Symptom = ({ label, selected, hasSymptoms, clickHandler }) => {
  const containerClasses = hasSymptoms
    ? [classes.Symptom, classes.SymptomWith]
    : [classes.Symptom];
  const cardClasses = selected
    ? [classes.SymptomCard, classes.SymptomcCardSelected]
    : [classes.SymptomCard];
  const labelClasses = selected
    ? [classes.SymptomLabel, classes.SymptomLabelSelected]
    : [classes.SymptomLabel];
  return (
    <div className={containerClasses.join(" ")}>
      <div className={cardClasses.join(" ")} onClick={clickHandler}>
        <p className={labelClasses.join(" ")}>{label}</p>
      </div>
    </div>
  );
};
export default Symptom;
