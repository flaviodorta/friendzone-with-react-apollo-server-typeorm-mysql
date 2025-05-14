export const postTypeDefs = `#graphql
  type Post {
    id: ID!
    content: String!
    author: User!
    createdAt: String!
    updateAt: String!
  }

  extend type Query {
    getAllPosts: [Post!]!
    getPostByFriends: [Post]!
  }

  extend type Mutation {
    createPost(content: String!): Post!
    deletePost(id: ID!): Boolean!
  }
`;
