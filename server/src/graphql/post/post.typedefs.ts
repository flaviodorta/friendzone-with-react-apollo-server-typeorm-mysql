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
    getPostById(id: ID!): Post
  }

  extend type Mutation {
    createPost(content: string!): Post!
    deletePost(id: ID!): Boolean!
  }
`;
