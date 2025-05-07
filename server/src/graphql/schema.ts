import { authResolvers } from './auth/auth.resolvers.ts';
import { authTypeDefs } from './auth/auth.typedefs.ts';
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

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  friendshipTypeDefs,
  authTypeDefs,
];

export const resolvers = [rootResolvers, userResolvers, authResolvers];
