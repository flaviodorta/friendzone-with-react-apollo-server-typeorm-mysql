import { gql } from '@apollo/client/index.js';

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
      email
      profilePhotoUrl
      bio
      birthday
      backgroundPhotoUrl
    }
  }
`;
