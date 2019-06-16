import { createContext } from "react";

const context = createContext({
  trackedSymptoms: [],
  mySymptomHistory: [],
  currentSelectedSymptom: "",
  currentWeek: null
});

export { context as default };
