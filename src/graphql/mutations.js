import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      user {
        id
        name
      }
      token
      expiresInSeconds
    }
  }
`;
export const EXTEND_TOKEN_MUTATION = gql`
  mutation {
    extendToken {
      user {
        id
        name
      }
      token
      expiresInSeconds
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      user {
        id
        name
      }
      token
      expiresInSeconds
    }
  }
`;

export const CREATE_USER_SYMPTOM_DETAIL_MUTATION = gql`
  mutation($symptomDetail: ID!, $date: String!) {
    createUserSymptomDetail(
      data: { symptomDetail: $symptomDetail, date: $date }
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
