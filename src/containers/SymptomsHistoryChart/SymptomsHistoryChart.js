import React from "react";
import Chart from "../../components/CorrelationChart";
const History = () => {
  const week = ["8/1", "8/2", "8/3", "8/4", "8/5", "8/6", "8/7"];
  const symptoms = [
    {
      symptom: "Bleeding",
      color: "blue",

      values: [
        { day: "8/1", symptoms: 1, label: "Cramps" },
        { day: "8/2", symptoms: 2, label: "Cramps" },
        { day: "8/3", symptoms: 1, label: "Cramps" },
        { day: "8/4", symptoms: 1, label: "Cramps" },
        { day: "8/5", symptoms: 1, label: "Cramps" }
      ]
    },
    {
      symptom: "Pain",
      color: "green",
      values: [
        { day: "8/1", symptoms: 1, label: "Headache, Heartache" },
        { day: "8/3", symptoms: 2, label: "Headache, Heartache" },
        { day: "8/6", symptoms: 1, label: "Headache, Heartache" },
        { day: "8/1", symptoms: 1, label: "Headache, Heartache" },
        { day: "8/6", symptoms: 1, label: "Headache, Heartache" },
        { day: "8/7", symptoms: 1, label: "Headache, Heartache" }
      ]
    }
  ];

  return (
    <div>
      <Chart symptoms={symptoms} week={week} />
    </div>
  );
};

export default History;
