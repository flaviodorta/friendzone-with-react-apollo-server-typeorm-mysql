export const authTypeDefs = `#graphql
  type AuthPayload {
    user: User!
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthPayload!
    logout: Boolean!
    refreshToken: AuthPayload!
  }
`;
