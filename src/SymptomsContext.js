import { createContext } from "react";

const context = createContext({
  trackedSymptoms: [],
  mySymptomHistory: [],
  selectedSymptom: "",
  isLoading: false,
  isAuth: false,
  sideBarIsVisible: false
});

export { context as default };
