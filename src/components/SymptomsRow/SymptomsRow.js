import React from "react";
import Symptom from "../Symptom";
import classes from "./SymptomsRow.module.css";

const SymptomsRow = ({ symptomList, selectedSymptom, clickHandler }) => {
  const symptoms = symptomList.map((item, i) => (
    <Symptom
      label={item}
      key={i}
      hasSymptoms={selectedSymptom === item}
      clickHandler={() => clickHandler(item)}
    />
  ));
  return (
    <div className={classes.SymptomsRow}>
      <span className={classes.SymptomsArrow}>{"<"}</span>
      <div className={classes.Symptoms}>{symptoms}</div>
      <span className={classes.SymptomsArrow}>{">"}</span>
    </div>
  );
};

export default SymptomsRow;
