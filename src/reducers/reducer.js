import {
  FETCH_SYMPTOMS,
  FETCH_USER_SYMPTOM_DETAILS,
  SELECT_DATE,
  SELECT_SYMPTOM,
  SET_LOADED,
  SET_LOADING,
  DELETE_USER_SYMPTOM_DETAIL,
  ADD_USER_SYMPTOM_DETAIL,
  LOGIN_RESPONSE,
  SIGNUP_RESPONSE,
  LOGOUT
} from "../actions/";

// const context = createContext({
//     trackedSymptoms: [],
//     mySymptomHistory: [],
//     currentSelectedSymptom: "",
//     currentWeek: null
//   });
const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoaded: false };
    case SET_LOADED:
      return { ...state, isLoaded: true };
    case FETCH_SYMPTOMS:
      const trackedSymptoms = payload;
      const selectedSymptom =
        state.selectedSymptom === ""
          ? payload.length > 0
            ? payload[0]
            : state.selectedSymptom
          : state.selectedSymptom;
      if (state.selectedSymptom === "") {
      }
      return { ...state, trackedSymptoms, selectedSymptom, isLoaded: true };
    case FETCH_USER_SYMPTOM_DETAILS:
      return { ...state, mySymptomHistory: payload };
    case ADD_USER_SYMPTOM_DETAIL:
      console.log("ADD_USER_SYMPTOM_DETAIL", payload);
      console.log("new symptom historyL", [...state.mySymptomHistory, payload]);
      return {
        ...state,
        mySymptomHistory: [...state.mySymptomHistory, payload]
      };
    case DELETE_USER_SYMPTOM_DETAIL:
      console.log("DELETE_USER_SYMPTOM_DETAIL", payload);
      console.log(
        "new symptom historyL",
        state.mySymptomHistory.filter(usd => payload.id !== usd.id)
      );

      return {
        ...state,
        mySymptomHistory: state.mySymptomHistory.filter(
          usd => payload.id !== usd.id
        )
      };
    case SELECT_DATE:
      return { ...state, selectedDate: payload };
    case SELECT_SYMPTOM:
      return { ...state, selectedSymptom: payload };
    case LOGIN_RESPONSE:
    case SIGNUP_RESPONSE:
      return { ...state, isAuth: true };
    case LOGOUT:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};

export { reducer as default };
