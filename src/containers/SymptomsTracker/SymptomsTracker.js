import React, { useState, useEffect, useContext } from "react";
import WeekBar from "../../components/WeekBar";
import SymptomsRow from "../../components/SymptomsRow";
import SymptomDetails from "../../components/SymptomDetails";
import Paper from "../../components/Paper";
import WeekBarCalendar from "../../components/WeekBarCalendar";
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

  const getSymptoms = async () => {
    await fetchSymptoms(dispatch);
    console.log("getSymptoms", state.trackedSymptoms);
  };
  const getUserSymptoms = async () => {
    await fetchUserSymptomDetails(dispatch);
  };

  // const getSelectedSymptomDetails = symptom => {
  //   console.log("symptomid", symptom);
  //   if (symptom === "") return [];
  //   const selectedNode = state.trackedSymptoms.find(
  //     element => element.id === symptom
  //   );
  //   if (selectedNode) {
  //     return selectedNode.symptomDetails;
  //   } else return [];
  // };

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
    if (state.selectedSymptom.isExclusive) {
      let symDetails = getUserDetails(
        state.selectedDate,
        state.selectedSymptom,
        state.mySymptomHistory
      );
      symDetails.forEach(sd => deleteUserSymptomDetail(dispatch, sd.id));
    }

    await createUserSymptomDetail(
      dispatch,
      symptomDetailId,
      state.selectedDate
    );
  };
  const removeSymptomDetail = userSymptomDetailId => {
    deleteUserSymptomDetail(dispatch, userSymptomDetailId);
  };
  return (
    <main>
      <WeekBar>
        {(today, week, selectCurrentDateHandler) => (
          <WeekBarCalendar
            today={today}
            week={week}
            selectCurrentDateHandler={selectCurrentDateHandler}
          />
        )}
      </WeekBar>
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
              color={state.selectedSymptom.color}
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
