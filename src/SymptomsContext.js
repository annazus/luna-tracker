import { createContext } from "react";

const context = createContext({
  trackedSymptoms: [],
  mySymptomHistory: [],
  selectedSymptom: "",
  isLoading: false
});

export { context as default };
