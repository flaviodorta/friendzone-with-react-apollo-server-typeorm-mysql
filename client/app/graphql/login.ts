import { gql } from '@apollo/client/index.js';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
