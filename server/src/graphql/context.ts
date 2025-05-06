import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { AppDataSource } from '../typeorm/config/data-source.ts';
import { Friendship } from '../typeorm/friendship/friendship.entity.ts';
import { User } from '../typeorm/user/user.entity.ts';
import { Post } from '../typeorm/post/post.entity.ts';

// type Request = {
//   headers?: {
//     authorization?: string;
//     [key: string]: string | undefined;
//   };
// };

export interface GraphQLContext {
  // currentUser: User | null;
  userRepo: ReturnType<typeof AppDataSource.getRepository>;
  friendshipRepo: ReturnType<typeof AppDataSource.getRepository>;
  postRepo: ReturnType<typeof AppDataSource.getRepository>;
}

export const context = async ({
  req,
}: StandaloneServerContextFunctionArgument): Promise<GraphQLContext> => {
  // const currentUser = await AppDataSource.getRepository(User).findOneBy({ id: curre})

  return {
    userRepo: AppDataSource.getRepository(User),
    friendshipRepo: AppDataSource.getRepository(Friendship),
    postRepo: AppDataSource.getRepository(Post),
  };
};
