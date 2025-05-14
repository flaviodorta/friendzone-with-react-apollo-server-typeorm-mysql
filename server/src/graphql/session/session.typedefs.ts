export const sessionTypeDefs = `#graphql
  type Session {
    id: ID!
    user: User!
    refreshToken: String!
    userAgent: String!
    ip: String!
    expiresAt: String!
    revoked: Boolean!
    createdAt: String!
  }

  extend type Query {
    getSessionFromRefreshToken: Session
  }

  extend type Mutation {
    revokeSession(sessionId: ID!): Boolean!
  }
`;
