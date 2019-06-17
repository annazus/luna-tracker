import gql from "graphql-tag";

export const CREATE_USER_SYMPTOM_DETAIL_MUTATION = gql`
  mutation($user: ID!, $symptomDetail: ID!, $date: String!) {
    createUserSymptomDetail(
      data: { user: $user, symptomDetail: $symptomDetail, date: $date }
    ) {
      user {
        id
        name
      }
      date
      id
      symptomDetail {
        id
        name
        symptom {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_USER_SYMPTOM_DETAIL_MUTATION = gql`
  mutation($userSymptomDetailId: ID!) {
    deleteUserSymptomDetail(userSymptomDetailId: $userSymptomDetailId) {
      user {
        id
        name
      }
      date
      id
      symptomDetail {
        id
        name
        symptom {
          id
          name
        }
      }
    }
  }
`;
