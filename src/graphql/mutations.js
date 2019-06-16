import gql from "graphql-tag";

export const CREATE_USER_SYMPTOM_DETAIL_MUTATION = gql`
  mutation($user: ID!, $symptomDetail: ID!, $date: String!) {
    createUserSymptomDetail(
      data: { user: $user, symptomDetail: $symptomDetail, date: $date }
    ) {
      user {
        name
      }
      symptomDetail {
        name
        symptom {
          name
        }
      }
    }
  }
`;
