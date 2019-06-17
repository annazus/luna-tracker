import React, { useState, useEffect, useContext } from "react";
import WeekBar from "../../components/WeekBar";
import SymptomsRow from "../../components/SymptomsRow";
import SymptomDetails from "../../components/SymptomDetails";
import Paper from "../../components/Paper";
import useClient from "../../useClient";
import SymptomsContext from "../../SymptomsContext";
import {
  fetchSymptoms,
  fetchUserSymptomDetails,
  selectSymptom,
  setLoaded,
  setLoading,
  createUserSymptomDetail,
  deleteUserSymptomDetail
} from "../../actions/actions";
const SymptomsTracker = () => {
  const { state, dispatch } = useContext(SymptomsContext);

  useEffect(() => {
    getSymptoms();
    getUserSymptoms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const client = useClient();

  const getSymptoms = async () => {
    await fetchSymptoms(client, dispatch);
    console.log("getSymptoms", state.trackedSymptoms);
  };
  const getUserSymptoms = async () => {
    await fetchUserSymptomDetails(client, dispatch);
  };

  const getSelectedSymptomDetails = symptom => {
    console.log("symptomid", symptom);
    if (symptom === "") return [];
    const selectedNode = state.trackedSymptoms.find(
      element => element.id === symptom
    );
    if (selectedNode) {
      return selectedNode.symptomDetails;
    } else return [];
  };

  const selectSymptomHandler = symptom => {
    selectSymptom(dispatch, symptom);
  };
  console.log(
    "tracked",
    state.trackedSymptoms.length > 0 ? state.trackedSymptoms : []
  );

  const getUserDetails = (date, symptom, symptomHistory) => {
    console.log("getUserDetails", symptomHistory, date, symptom);
    if (!date || !symptom || !symptomHistory) return [];
    const userList = symptomHistory.filter(element => {
      console.log(
        "comparing",
        element.date,
        date,
        element.symptomDetail.symptom.id,
        symptom.id
      );
      return (
        element.date === date && element.symptomDetail.symptom.id === symptom.id
      );
    });
    return userList;
  };

  const addSymptomDetail = async symptomDetailId => {
    console.log("addSymptomDetail", symptomDetailId);
    await createUserSymptomDetail(
      client,
      dispatch,
      "a090977a-2325-4681-aa1e-55dd821a7319",
      symptomDetailId,
      state.selectedDate
    );
  };
  const removeSymptomDetail = userSymptomDetailId => {
    deleteUserSymptomDetail(client, dispatch, userSymptomDetailId);
  };
  return (
    <main>
      <WeekBar />
      {state.isLoading ? null : (
        <Paper>
          <SymptomsRow
            symptomList={state.trackedSymptoms}
            selectSymptomHandler={selectSymptomHandler}
            selectedSymptom={state.selectedSymptom}
          />
          {state.selectedSymptom ? (
            <SymptomDetails
              symptomId={state.selectedSymptom.id}
              isExclusive={state.selectedSymptom.isExclusive}
              symptomDetails={state.selectedSymptom.symptomDetails}
              userSymptomDetails={getUserDetails(
                state.selectedDate,
                state.selectedSymptom,
                state.mySymptomHistory
              )}
              addSymptomDetail={addSymptomDetail}
              removeSymptomDetail={removeSymptomDetail}
            />
          ) : null}
        </Paper>
      )}
    </main>
  );
};

export { SymptomsTracker as default };
