import { gql } from '@apollo/client/index.js';

export const CREATE_USER = gql`
  mutation CREATE_USER(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $birthday: String!
    $gender: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      birthday: $birthday
      gender: $gender
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;
