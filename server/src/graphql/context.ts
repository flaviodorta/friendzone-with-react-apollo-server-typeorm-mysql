import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { AppDataSource } from '../typeorm/config/data-source.ts';
import { Friendship } from '../typeorm/entities/friendship.entity.ts';
import { User } from '../typeorm/entities/user.entity.ts';
import { Post } from '../typeorm/entities/post.entity.ts';
import { IncomingMessage, ServerResponse } from 'http';
import { Session } from '../typeorm/entities/session.entity.ts';

export interface GraphQLContext {
  // currentUser: User | null;
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
  // const currentUser = await AppDataSource.getRepository(User).findOneBy({ id: curre})

  return {
    res,
    req,
    userRepo: AppDataSource.getRepository(User),
    friendshipRepo: AppDataSource.getRepository(Friendship),
    postRepo: AppDataSource.getRepository(Post),
    sessionRepo: AppDataSource.getRepository(Session),
  };
};
