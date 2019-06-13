import React from "react";
import SymptomTrait from "../SymptomTrait";
import classes from "./SymptomTraits.module.css";
const SymptomTraits = ({ symptom, values, isExclusive, clickHandler }) => {
  const symptomsContent = symptomValues => {
    console.log(symptomValues);
    return symptomValues.map((item, i) => {
      const symptomTrait = Object.keys(item)[0];
      const selected = item[symptomTrait];
      return (
        <SymptomTrait
          selected={selected}
          label={symptomTrait}
          key={i}
          className={classes.SymptomTrait}
          clickHandler={() => clickHandler(symptom, symptomTrait)}
        />
      );
    });
  };

  return <div className={classes.SymptomTraits}>{symptomsContent(values)}</div>;
};
export default SymptomTraits;
