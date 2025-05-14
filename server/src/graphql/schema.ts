import { authResolvers } from './auth/auth.resolvers.ts';
import { authTypeDefs } from './auth/auth.typedefs.ts';
import { friendshipResolvers } from './friendship/friendship.resolvers.ts';
import { friendshipTypeDefs } from './friendship/friendship.typedefs.ts';
import { postResolvers } from './post/post.resolvers.ts';
import { postTypeDefs } from './post/post.typedefs.ts';
import { sessionResolvers } from './session/session.resolvers.ts';
import { sessionTypeDefs } from './session/session.typedefs.ts';
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
  authTypeDefs,
  friendshipTypeDefs,
  postTypeDefs,
  sessionTypeDefs,
];

export const resolvers = [
  rootResolvers,
  userResolvers,
  authResolvers,
  friendshipResolvers,
  postResolvers,
  sessionResolvers,
];
