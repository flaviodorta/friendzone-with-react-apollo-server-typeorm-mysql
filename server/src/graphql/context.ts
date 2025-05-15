import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { AppDataSource } from '../typeorm/config/data-source.ts';
import { Friendship } from '../typeorm/entities/friendship.entity.ts';
import { User } from '../typeorm/entities/user.entity.ts';
import { Post } from '../typeorm/entities/post.entity.ts';
import { IncomingMessage, ServerResponse } from 'http';
import { Session } from '../typeorm/entities/session.entity.ts';
import { parseCookies, verifyRefreshToken } from '../utils/fn.ts';
import { GraphQLError } from 'graphql';

export interface GraphQLContext {
  currentUser: User | null;
  userRepo: ReturnType<typeof AppDataSource.getRepository>;
  friendshipRepo: ReturnType<typeof AppDataSource.getRepository>;
  postRepo: ReturnType<typeof AppDataSource.getRepository>;
  sessionRepo: ReturnType<typeof AppDataSource.getRepository>;
  req: IncomingMessage;
  res: ServerResponse;
}

export const context = async ({
  res,
  req,
}: StandaloneServerContextFunctionArgument): Promise<GraphQLContext> => {
  const cookies = parseCookies(req.headers.cookie || '');
  const token = cookies.refreshToken;
  let currentUser: User | null = null;

  if (token) {
    const decoded = verifyRefreshToken(token);
    if (decoded) {
      currentUser = await AppDataSource.getRepository(User).findOneBy({
        id: decoded.userId,
      });
    }
  }

  return {
    res,
    req,
    currentUser,
    userRepo: AppDataSource.getRepository(User),
    friendshipRepo: AppDataSource.getRepository(Friendship),
    postRepo: AppDataSource.getRepository(Post),
    sessionRepo: AppDataSource.getRepository(Session),
  };
};
