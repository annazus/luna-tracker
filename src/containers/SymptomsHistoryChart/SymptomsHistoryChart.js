import React, { useState, useEffect, useContext } from "react";
import Chart from "../../components/CorrelationChart";
import { fetchUserSymptomDetails } from "../../actions/actions";
import SymptomsContext from "../../SymptomsContext";
import WeekBar from "../../components/WeekBar";
const History = ({ today }) => {
  const [week, setWeek] = useState([]);
  const [chartSymptoms, setChartSymptoms] = useState([]);

  const { state, dispatch } = useContext(SymptomsContext);
  useEffect(() => {
    // getUserSymptoms();
    console.log("mySymptomHistory", state.mySymptomHistory);
    console.log("week", week);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getUserSymptoms = async () => {
    await fetchUserSymptomDetails(dispatch);
  };
  const updateWeek = week1 => {
    setWeek(week1);
    console.log("First call updateWeek", week1);
    if (!week) return;
    if (state.mySymptomHistory) {
      const SymptomList = state.mySymptomHistory.map(
        usd => usd.symptomDetail.symptom.name
      );
      const SympSet = new Set(SymptomList);
      console.log("SympSet", SympSet);

      let _symptoms = [];
      const color = ["red", "green", "blue", "brown", "yello", "orange"];
      SympSet.forEach((sym, m) => {
        const s = sym;
        let _values = [];
        week1.forEach(d => {
          const sd = state.mySymptomHistory.filter(
            usd => usd.date === d.date && usd.symptomDetail.symptom.name === sym
          );
          let _val = 0;
          let label = "";
          sd.forEach(ls => {
            _val++;
            label = label
              ? ls.symptomDetail.name
              : ", " + ls.symptomDetail.name;
          });
          //   if (_val > 0) {
          console.log(d.dayOfWeek);
          _values.push({ day: d.key, symptoms: _val, label: s + ":" + label });
          //   }
        });
        _symptoms.push({ symptom: s, values: _values, color: color[m] });
      });
      setChartSymptoms(_symptoms);
      console.log("chartSymptoms", _symptoms);
    }
  };
  //   const week = ["8/1", "8/2", "8/3", "8/4", "8/5", "8/6", "8/7"];

  return (
    <div>
      <WeekBar updateWeek={updateWeek}>
        <Chart symptoms={chartSymptoms} week={week} />
      </WeekBar>
    </div>
  );
};

export default History;
