import React, { useState, useEffect, useContext } from "react";
import Chart from "../../components/CorrelationChart";
import { fetchUserSymptomDetails } from "../../actions/actions";
import SymptomsContext from "../../SymptomsContext";
import WeekBar from "../../components/WeekBar";
const History = ({ today }) => {
  const { state, dispatch } = useContext(SymptomsContext);
  useEffect(() => {
    getUserSymptoms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getUserSymptoms = async () => {
    await fetchUserSymptomDetails(dispatch);
  };

  const getSymptomsForChart = (_week, myHistory) => {
    // const SymptomList = myHistory.map(usd => ({
    //   symptom: usd.symptomDetail.symptom.name,
    //   color: usd.symptomDetail.symptom.color
    // }));
    const SymptomList = myHistory.map(usd => usd.symptomDetail.symptom.name);
    const SympSet = new Set(SymptomList);

    let _symptoms = [];
    SympSet.forEach((sym, m) => {
      let _values = [];
      _week.forEach(d => {
        const sd = myHistory.filter(
          usd => usd.date === d.date && usd.symptomDetail.symptom.name === sym
        );
        let _val = 0;
        let label = "";
        sd.forEach(ls => {
          _val++;
          label = label
            ? label + ", " + ls.symptomDetail.name
            : ls.symptomDetail.name;
        });
        //   if (_val > 0) {
        _values.push({
          day: d.key,
          symptoms: _val,
          label: sym + ": " + label
        });
        //   }
      });
      _symptoms.push({
        symptom: sym,
        values: _values,
        color: state.trackedSymptoms.filter(s => s.name === sym)[0].color
      });
    });
    return _symptoms;
  };

  return (
    <div>
      <WeekBar>
        {(today, week) => (
          <Chart
            symptoms={getSymptomsForChart(week, state.mySymptomHistory)}
            today={today}
            week={week}
          />
        )}
      </WeekBar>
    </div>
  );
};

export default History;
