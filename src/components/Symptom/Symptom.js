import React from "react";
import classes from "./Symptom.module.css";
const Symptom = ({ label, selected, hasSymptoms, clickHandler, color }) => {
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
    <div className={containerClasses.join(" ")} style={{ borderColor: color }}>
      <div
        className={cardClasses.join(" ")}
        onClick={clickHandler}
        style={{ borderColor: color }}
      >
        <p className={labelClasses.join(" ")} style={{ color: color }}>
          {label}
        </p>
      </div>
    </div>
  );
};
export default Symptom;
