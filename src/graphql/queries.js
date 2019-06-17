import gql from "graphql-tag";

export const ME_QUERY = gql`
  {
    me {
      id
      name
      email
    }
  }
`;

export const SYMPTOMS_QUERY = gql`
  query {
    symptoms {
      id
      name
      isExclusive
      symptomDetails {
        id
        name
      }
    }
  }
`;

export const USER_SYMPTOMS_QUERY = gql`
  query {
    userSymptomDetails {
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
