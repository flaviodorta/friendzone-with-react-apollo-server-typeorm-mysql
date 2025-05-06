export const friendshipTypeDefs = `#graphql
  enum FriendshipStatus {
    pending
    accepted
    rejected
  }

  type Friendship {
    id: ID!
    requester: User!
    recipient: User!
    status: FriendshipStatus!
    isSeen: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getMyFriends: [User!]!
    getPendingFriendRequests: [Friendship!]!
    getSentFriendRequests: [Friendship!]!
  }

  extend type Mutation {
    sendFriendRequest(toUserId: ID!): Friendship!
    acceptFriendRequest(requestId: ID!): Friendship!
    rejectFriendRequest(requestId: ID!): Boolean!
    markFriendRequestAsSeen(requestId: ID!): Boolean!
  }
`;
