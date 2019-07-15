import getClient from "../useClient";
import { SYMPTOMS_QUERY, USER_SYMPTOMS_QUERY } from "../graphql/queries";
import {
  CREATE_USER_SYMPTOM_DETAIL_MUTATION,
  DELETE_USER_SYMPTOM_DETAIL_MUTATION
} from "../graphql/mutations";

export const FETCH_SYMPTOMS = "FETCH_SYMPTOMS";
export const FETCH_USER_SYMPTOM_DETAILS = "FETCH_USER_SYMPTOM_DETAILS";
export const SELECT_DATE = "SELECT_DATE";
export const SET_LOADING = "SET_LOADING";
export const SET_LOADED = "SET_LOADED";
export const SELECT_SYMPTOM = "SELECT_SYMPTOM";
export const ADD_USER_SYMPTOM_DETAIL = "ADD_USER_SYMPTOM_DETAIL";
export const DELETE_USER_SYMPTOM_DETAIL = "DELETE_USER_SYMPTOM_DETAIL";

const selectDate = (dispatch, date) => {
  dispatch({ type: SELECT_DATE, payload: date });
};
const selectSymptom = (dispatch, symptom) => {
  dispatch({ type: SELECT_SYMPTOM, payload: symptom });
};

const setLoaded = dispatch => {
  dispatch({ type: SET_LOADED });
};
const setLoading = dispatch => {
  dispatch({ type: SET_LOADING });
};
const fetchSymptoms = async dispatch => {
  const client = getClient();
  try {
    setLoading(dispatch);
    const symptoms = await client.query({
      query: SYMPTOMS_QUERY
    });
    dispatch({ type: FETCH_SYMPTOMS, payload: symptoms.data.symptoms });
    setLoaded(dispatch);
  } catch (error) {
    setLoaded(dispatch);

    console.log(error);
    throw new Error("Error fetching symptoms");
  }
};

const fetchUserSymptomDetails = async dispatch => {
  const client = getClient();

  try {
    const symptomDetails = await client.query({
      query: USER_SYMPTOMS_QUERY
    });
    dispatch({
      type: FETCH_USER_SYMPTOM_DETAILS,
      payload: symptomDetails.data.userSymptomDetails
    });
  } catch (error) {
    console.log(error);
  }
};

const createUserSymptomDetail = async (dispatch, symptomDetailId, date) => {
  const client = getClient();
  try {
    const variables = {
      symptomDetail: symptomDetailId,
      date: date
    };
    const userSymptomDetail = await client.mutate({
      variables,
      mutation: CREATE_USER_SYMPTOM_DETAIL_MUTATION
    });

    dispatch({
      type: ADD_USER_SYMPTOM_DETAIL,
      payload: userSymptomDetail.data.createUserSymptomDetail
    });

    // return userSymptomDetail.data.userSymptomDetails;
  } catch (error) {
    console.log(error);
  }
};

const deleteUserSymptomDetail = async (dispatch, userSymptomDetailId) => {
  const client = getClient();

  try {
    const variables = {
      userSymptomDetailId: userSymptomDetailId
    };

    const userSymptomDetail = await client.mutate({
      mutation: DELETE_USER_SYMPTOM_DETAIL_MUTATION,
      variables
    });
    dispatch({
      type: DELETE_USER_SYMPTOM_DETAIL,
      payload: userSymptomDetail.data.deleteUserSymptomDetail
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  selectDate,
  selectSymptom,
  fetchSymptoms,
  fetchUserSymptomDetails,
  createUserSymptomDetail,
  deleteUserSymptomDetail,
  setLoaded,
  setLoading
};
