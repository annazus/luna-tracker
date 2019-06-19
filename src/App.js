import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Switch, Route } from "react-router-dom";
import SymptomsTracker from "./containers/SymptomsTracker";
import SymptomsHistoryChart from "./containers/SymptomsHistoryChart";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <ProtectedRoute path="/" exact component={SymptomsTracker} />
          <ProtectedRoute path="/history" component={SymptomsHistoryChart} />

          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />

          <Route path="/signup" component={Signup} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
