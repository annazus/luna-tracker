import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SymptomsTracker from "./containers/SymptomsTracker";
import useClient from "./useClient";
import gql from "graphql-tag";
import { SYMPTOMS_QUERY } from "./graphql/queries";
function App() {
  const client = useClient();
  // client
  //   .query({
  //     query: gql`
  //       query {
  //         me {
  //           email
  //         }
  //       }
  //     `
  //   })
  client
    .query({
      query: SYMPTOMS_QUERY
    })
    .then(result => console.log("searching", result))
    .catch(error => console.log(error));

  return (
    <div className="App">
      <SymptomsTracker />
    </div>
  );
}

export default App;
