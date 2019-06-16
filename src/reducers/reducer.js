import {
  FETCH_SYMPTOMS,
  FETCH_USER_SYMPTOM_DETAILS,
  SELECT_DATE
} from "../actions/actions";

// const context = createContext({
//     trackedSymptoms: [],
//     mySymptomHistory: [],
//     currentSelectedSymptom: "",
//     currentWeek: null
//   });
const reducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_SYMPTOMS:
      return { ...state, trackedSymptoms: payload };
    case FETCH_USER_SYMPTOM_DETAILS:
      return { ...state, mySymptomHistory: payload };
    case SELECT_DATE:
      return { ...state, selectedDate: payload };
    default:
      return state;
  }
};

export { reducer as default };
