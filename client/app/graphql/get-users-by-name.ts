import { gql } from '@apollo/client/index.js';

export const GET_USERS_BY_NAME = gql`
  query GetUsersByName($name: String!) {
    getUsersByName(name: $name) {
      id
      firstName
      lastName
      email
      profilePhotoUrl
    }
  }
`;
