import { In } from 'typeorm';
import { ensureAuthenticated } from '../../utils/fn.ts';
import { GraphQLContext } from '../context.ts';
import { GraphQLError } from 'graphql';

const getAllPosts = async (
  _: any,
  __: any,
  { currentUser, postRepo }: GraphQLContext
) => {
  ensureAuthenticated(currentUser);

  return await postRepo.find({
    order: { createdAt: 'DESC' },
    relations: ['author'],
  });
};

const getPostByFriends = async (
  _: any,
  __: any,
  { currentUser, postRepo, friendshipRepo }: GraphQLContext
) => {
  ensureAuthenticated(currentUser);

  const friendships = await friendshipRepo.find({
    where: [
      { requester: { id: currentUser!.id }, status: 'accepted' },
      { recipient: { id: currentUser!.id }, status: 'accepted' },
    ],
    relations: ['requester', 'recipient'],
  });

  const friendsIds: string[] = friendships.map((f) =>
    f.requester.id === currentUser!.id ? f.recipient.id : f.requester.id
  );

  if (friendsIds.length === 0) return [];

  return await postRepo.find({
    where: {
      author: { id: In(friendsIds) },
    },
    order: { createdAt: 'DESC' },
    relations: ['author'],
  });
};

// mutations

const createPost = async (
  _: any,
  { content }: { content: string },
  { currentUser, postRepo }: GraphQLContext
) => {
  ensureAuthenticated(currentUser);

  const post = postRepo.create({
    content,
    author: currentUser,
  });

  return await postRepo.save(post);
};

const deletePost = async (
  _: any,
  { id }: { id: string },
  { currentUser, postRepo }: GraphQLContext
) => {
  ensureAuthenticated(currentUser);

  const post = await postRepo.findOne({
    where: { id },
    relations: ['author'],
  });

  if (!post) {
    throw new GraphQLError('Post not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  if (post.author.id !== currentUser!.id) {
    throw new GraphQLError('Not authorized to delete this post.');
  }

  await postRepo.remove(post);
  return true;
};

export const postResolvers = {
  Query: {
    getAllPosts,
    getPostByFriends,
  },
  Mutation: {
    createPost,
    deletePost,
  },
};
