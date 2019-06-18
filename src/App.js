import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";

import SymptomsTracker from "./containers/SymptomsTracker";
function App() {
  return (
    <div className="App">
      <Layout>
        <Login />
      </Layout>
    </div>
  );
}

export default App;
