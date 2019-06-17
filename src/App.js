import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import SymptomsTracker from "./containers/SymptomsTracker";
function App() {
  return (
    <div className="App">
      <Layout>
        <SymptomsTracker />
      </Layout>
    </div>
  );
}

export default App;
