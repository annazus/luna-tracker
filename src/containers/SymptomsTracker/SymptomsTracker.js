import React, { useState, useEffect } from "react";
import WeekBar from "../../components/WeekBar";
import SymptomsRow from "../../components/SymptomsRow";
import SymptomTraits from "../../components/SymptomTraits";
import Paper from "../../components/Paper";
const SymptomsTracker = () => {
  const [currentSymptom, setCurrentSymptom] = useState("Bleeding");
  const [currentSymptomPage, setCurrentSymptomPage] = useState(0);
  const [forwardArrowDisabled, setForwardArrowDisabled] = useState(false);
  const [backArrowDisabled, setbackArrowDisabled] = useState(true);

  const [currentDay, setCurrentDay] = useState("20190611");
  const [mySymptoms, setMySymptoms] = useState({
    "20190610": { Bleeding: ["Light"], Pain: ["Cramp", "Ovulation"] },

    "20190611": { Bleeding: ["Spotting"], Pain: ["Cramp", "Headache"] }
  });
  const [symptoms] = useState({
    Bleeding: {
      values: ["Light", "Medium", "Heavy", "Spotting"],
      isExclusive: true
    },
    Pain: {
      values: ["Cramp", "Headache", "Ovulation", "Tender Breasts"],
      isExclusive: false
    },
    Emotions: {
      values: ["Happy", "Sensitive", "Sad", "PMS"],
      isExclusive: false
    },
    Sleep: {
      values: [
        "0 to 3 hours",
        "3 to 6 hours",
        "6 to 9 hours",
        "9 hours or more"
      ],
      isExclusive: true
    },
    Sex: {
      values: ["Unprotected", "Protected", "High Sex Drive", "Withdrawal"],
      isExclusive: false
    },
    Energy: {
      values: ["Energized", "High", "Low", "Exhausted"],
      isExclusive: true
    }
  });

  const scrollSymptomsHandler = forward => {
    console.log("scrollSymptomsHandler");
    const _symptoms = Object.keys(symptoms);
    let newPage;
    if (forward) {
      if (currentSymptomPage * 3 + 3 < _symptoms.length) {
        newPage = currentSymptomPage + 1;
      }
    } else {
      if (currentSymptomPage > 0) {
        newPage = currentSymptomPage - 1;
      }
    }
    setCurrentSymptomPage(newPage);

    if (newPage === 0) {
      setbackArrowDisabled(true);
    } else {
      setbackArrowDisabled(false);
    }

    if (newPage * 3 + 3 < _symptoms.length) {
      setForwardArrowDisabled(false);
    } else setForwardArrowDisabled(true);
  };
  const fetchMySymptomTraits = (date, symptom) => {
    console.log("mySymptoms", mySymptoms);
    const getMySymptomsForThisDate = mySymptoms[date];
    const getMyValuesForThisSymptom = getMySymptomsForThisDate
      ? getMySymptomsForThisDate[symptom]
      : null;

    const getValuesForThisSymptom = symptoms[symptom].values;

    const mySymptomTraits = getValuesForThisSymptom.map(value => ({
      [value]:
        getMyValuesForThisSymptom && getMyValuesForThisSymptom.includes(value)
          ? true
          : false
    }));
    console.log(mySymptomTraits);
    return mySymptomTraits;
  };

  const symptomPage = 0;

  const symptomTraitClickHandler = (symptom, value) => {
    console.log(mySymptoms);

    console.log(currentDay, symptom, value);
    if (
      !mySymptoms[currentDay] ||
      !mySymptoms[currentDay][symptom] ||
      !mySymptoms[currentDay][symptom].includes(value)
    ) {
      if (symptoms[symptom].isExclusive) {
        setMySymptoms({
          ...mySymptoms,
          [currentDay]: {
            ...mySymptoms[currentDay],
            [symptom]: [value]
          }
        });
      } else {
        setMySymptoms({
          ...mySymptoms,
          [currentDay]: {
            ...mySymptoms[currentDay],
            [symptom]: mySymptoms[currentDay]
              ? mySymptoms[currentDay][symptom]
                ? mySymptoms[currentDay][symptom].concat(value)
                : []
              : [value]
          }
        });
      }
    } else {
      setMySymptoms({
        ...mySymptoms,
        [currentDay]: {
          ...mySymptoms[currentDay],
          [symptom]: mySymptoms[currentDay][symptom].filter(
            item => item !== value
          )
        }
      });
    }
  };
  const symptomClickHandler = symptom => {
    setCurrentSymptom(symptom);
    console.log(symptom);
  };
  return (
    <main>
      <WeekBar selectDayHandler={date => setCurrentDay(date)} />
      <Paper>
        <SymptomsRow
          symptomList={Object.keys(symptoms).slice(
            currentSymptomPage * 3,
            currentSymptomPage * 3 + 3
          )}
          selectedSymptom={currentSymptom}
          clickHandler={symptomClickHandler}
          forwardArrowDisabled={forwardArrowDisabled}
          backArrowDisabled={backArrowDisabled}
          scrollSymptoms={forward => scrollSymptomsHandler(forward)}
        />
        <SymptomTraits
          symptom={currentSymptom}
          //   values={symptoms[currentSymptom].values}
          values={fetchMySymptomTraits(currentDay, currentSymptom)}
          isExclusive={symptoms[currentSymptom].values}
          clickHandler={symptomTraitClickHandler}
          scrol
        />
      </Paper>
    </main>
  );
};

export { SymptomsTracker as default };
