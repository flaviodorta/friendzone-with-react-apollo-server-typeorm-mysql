import { GraphQLContext } from '../context';

const getAllPosts = async (_: any, __: any, { postRepo }: GraphQLContext) => {
  return await postRepo.find({
    order: { createdAt: 'DESC' },
    relations: ['author'],
  });
};

const createPost = async (
  _: any,
  { content }: { content: string },
  { postRepo }: GraphQLContext
) => {
  const post = postRepo.create({
    content,
  });
};
