export const userTypeDefs = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    profilePhotoUrl: String
    backgroundPhotoUrl: String
    bio: String
    birthday: String!
    createdAt: String!
    updateAt: String!
    sentFriendRequests: [Friendship]!
    receivedFriendRequests: [Friendship]!
    password: String
  }

  extend type Query {
    getUserById(id: ID!): User
  }

  extend type Mutation {
    createUser(data: CreateUserInput!): User!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    birthday: String!
  }
`;
