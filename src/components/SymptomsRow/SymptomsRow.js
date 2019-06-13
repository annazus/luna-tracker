import React from "react";
import Symptom from "../Symptom";
import classes from "./SymptomsRow.module.css";

const SymptomsRow = ({
  symptomList,
  selectedSymptom,
  clickHandler,
  scrollSymptoms,
  backArrowDisabled = true,
  forwardArrowDisabled = true
}) => {
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
      {!backArrowDisabled ? (
        <button
          className={classes.SymptomsArrow}
          onClick={() => scrollSymptoms(false)}
        >
          {"<"}
        </button>
      ) : (
        <div className={classes.SymptomsArrow} />
      )}
      <div className={classes.Symptoms}>{symptoms}</div>
      {!forwardArrowDisabled ? (
        <button
          className={classes.SymptomsArrow}
          onClick={() => scrollSymptoms(true)}
        >
          {">"}
        </button>
      ) : (
        <div className={classes.SymptomsArrow} />
      )}
    </div>
  );
};

export default SymptomsRow;
