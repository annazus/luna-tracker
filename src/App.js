import React, { useContext, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Auth from "./components/Auth/Auth";
import Logout from "./components/Auth/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Switch, Route } from "react-router-dom";
import SymptomsTracker from "./containers/SymptomsTracker";
import SymptomsHistoryChart from "./containers/SymptomsHistoryChart";
import SymptomsContext from "./SymptomsContext";
import { checkAuthState } from "./actions";

function App() {
  const { state, dispatch } = useContext(SymptomsContext);
  useEffect(() => {
    checkAuthState(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <Layout>
        <Switch>
          <ProtectedRoute path="/" exact component={SymptomsTracker} />
          <ProtectedRoute path="/history" component={SymptomsHistoryChart} />

          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
