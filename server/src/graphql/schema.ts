import { friendshipTypeDefs } from './friendship/friendship.typedefs.ts';
import { userResolvers } from './user/user.resolvers.ts';
import { userTypeDefs } from './user/user.typedefs.ts';

const rootTypeDefs = `#graphql
  type Query 

  type Mutation
`;

const rootResolvers = {
  Query: {},
  Mutation: {},
};

export const typeDefs = [rootTypeDefs, userTypeDefs, friendshipTypeDefs];

export const resolvers = [rootResolvers, userResolvers];
