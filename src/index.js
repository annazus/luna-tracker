import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SymptomsContext from "./SymptomsContext";
import reducer from "./reducers/reducer";
import * as serviceWorker from "./serviceWorker";
const Root = () => {
  const initialState = useContext(SymptomsContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SymptomsContext.Provider value={{ state, dispatch }}>
      <App />
    </SymptomsContext.Provider>
  );
};
ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
