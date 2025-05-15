import { gql } from '@apollo/client/index.js';

export const GET_SESSION = gql`
  query GetSessionFromRefreshToken {
    getSessionFromRefreshToken {
      id
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
