import moment from "moment";
import { SYMPTOMS_QUERY, USER_SYMPTOMS_QUERY } from "../graphql/queries";
import { CREATE_USER_SYMPTOM_DETAIL_MUTATION } from "../graphql/mutations";

export const FETCH_SYMPTOMS = "FETCH_SYMPTOMS";
export const FETCH_USER_SYMPTOM_DETAILS = "FETCH_USER_SYMPTOM_DETAILS";
export const SELECT_DATE = "SELECT_DATE";

const selectDate = (dispatch, date) => {
  dispatch({ type: SELECT_DATE, payload: date });
};
const fetchSymptoms = async (client, dispatch) => {
  try {
    const symptoms = await client.query({
      query: SYMPTOMS_QUERY
    });
    dispatch({ type: FETCH_SYMPTOMS, payload: symptoms.data });
    console.log("FETCH_SYMPTOMS", symptoms);
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching symptoms");
  }
};

const fetchUserSymptomDetails = async (client, dispatch) => {
  try {
    const symptomDetails = await client.query({
      query: USER_SYMPTOMS_QUERY
    });
    dispatch({
      type: FETCH_USER_SYMPTOM_DETAILS,
      payload: symptomDetails.data
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching symptoms");
  }
};

const createUserSymptomDetail = async (
  client,
  userId,
  symptomDetailId,
  date
) => {
  try {
    const variables = {
      user: userId,
      symptomDetail: symptomDetailId,
      date: date
    };
    const userSymptomDetail = await client.mutation(
      CREATE_USER_SYMPTOM_DETAIL_MUTATION,
      variables
    );
    console.log(userSymptomDetail.data);
    return userSymptomDetail.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  selectDate,
  fetchSymptoms,
  fetchUserSymptomDetails,
  createUserSymptomDetail
};
