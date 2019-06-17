import React, { useState } from "react";
import Symptom from "../Symptom";
import classes from "./SymptomsRow.module.css";

export const SYMPTOM_PAGE_SIZE = 3;
const SymptomsRow = ({
  symptomList,
  selectSymptomHandler,
  selectedSymptom
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [backArrowDisabled, setbackArrowDisabled] = useState(false);
  const [forwardArrowDisabled, setForwardArrowDisabled] = useState(false);

  const scrollSymptomsHandler = forward => {
    let newPage;
    if (forward) {
      if (
        currentPage * SYMPTOM_PAGE_SIZE + SYMPTOM_PAGE_SIZE <
        symptomList.length
      ) {
        newPage = currentPage + 1;
        setForwardArrowDisabled(false);
      } else {
        setForwardArrowDisabled(true);
      }
    } else {
      if (currentPage > 0) {
        newPage = setCurrentPage - 1;
        setbackArrowDisabled(false);
      } else {
        setbackArrowDisabled(true);
      }
    }
    setCurrentPage(newPage);
  };

  const symptomsContent = symptomList.map(symptom => (
    <Symptom
      label={symptom.name}
      key={symptom.id}
      hasSymptoms={selectedSymptom.id === symptom.id}
      clickHandler={() => selectSymptomHandler(symptom)}
    />
  ));

  return (
    <div className={classes.SymptomsRow}>
      {!backArrowDisabled ? (
        <button
          className={classes.SymptomsArrow}
          onClick={() => scrollSymptomsHandler(false)}
        >
          {"<"}
        </button>
      ) : (
        <div className={classes.SymptomsArrow} />
      )}
      <div className={classes.Symptoms}>{symptomsContent}</div>
      {!forwardArrowDisabled ? (
        <button
          className={classes.SymptomsArrow}
          onClick={() => scrollSymptomsHandler(true)}
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
