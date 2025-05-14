import { GraphQLError } from 'graphql';
import { ensureAuthenticated } from '../../utils/fn.ts';
import { GraphQLContext } from '../context.ts';

// querys

const getMyFriends = async (
  _: any,
  __: any,
  { currentUser, friendshipRepo }: GraphQLContext
) => {
  ensureAuthenticated(currentUser);

  const friendships = await friendshipRepo.find({
    where: [
      { requester: { id: currentUser!.id }, status: 'accepted ' },
      { recipient: { id: currentUser!.id }, status: 'accepted ' },
    ],
    relations: ['requester', 'recipient'],
  });

  return friendships.map((f) =>
    f.requester.id === currentUser!.id ? f.recipient : f.requester
  );
};

const getPendingFriendRequests = async (
  _: any,
  __: any,
  { currentUser, friendshipRepo }: GraphQLContext
) => {
  ensureAuthenticated(currentUser);

  return await friendshipRepo.find({
    where: {
      recipient: { id: currentUser!.id },
      status: 'pending',
    },
    relations: ['requester'],
    order: { createdAt: 'DESC' },
  });
};

const getSentFriendRequest = async (
  _: any,
  { toUserId }: { toUserId: string },
  { currentUser, friendshipRepo }: GraphQLContext
) => {
  ensureAuthenticated(currentUser);

  return friendshipRepo.find({
    where: {
      requester: { id: currentUser!.id },
      recipient: toUserId,
      status: 'pending',
    },
    relations: ['recipient'],
  });
};

// mutations

const sendFriendRequest = async (
  _: any,
  { toUserId }: { toUserId: string },
  { currentUser, friendshipRepo, userRepo }: GraphQLContext
) => {
  ensureAuthenticated(currentUser);

  if (toUserId === currentUser!.id) {
    throw new GraphQLError('You cannot send a friend request to yourself', {
      extensions: { code: 'BAD_REQUEST' },
    });
  }

  const recipient = await userRepo.findOneBy({ id: toUserId });
  if (!recipient) {
    throw new GraphQLError('Recipient not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  const existing = await friendshipRepo.findOne({
    where: [
      { requester: { id: currentUser!.id }, recipient: { id: toUserId } },
      { requester: { id: toUserId }, recipient: { id: currentUser!.id } },
    ],
  });

  if (existing) {
    throw new GraphQLError('Friend request already exists', {
      extensions: { code: 'BAD_REQUEST' },
    });
  }

  const newFriendship = friendshipRepo.create({
    requester: currentUser,
    recipient,
    status: 'pending',
  });

  return await friendshipRepo.save(newFriendship);
};

const acceptFriendRequest = async (
  _: any,
  { requestId }: { requestId: string },
  { currentUser, friendshipRepo }: GraphQLContext
) => {
  ensureAuthenticated(currentUser);

  const request = await friendshipRepo.findOne({
    where: { id: requestId },
    relations: ['recipient'],
  });

  if (!request) {
    throw new GraphQLError('Friend request not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  if (request.recipient.id !== currentUser!.id) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'FORBIDDEN' },
    });
  }

  request.status = 'accepted';
  return await friendshipRepo.save(request);
};

const rejectFriendRequest = async (
  _: any,
  { requestId }: { requestId: string },
  { currentUser, friendshipRepo }: GraphQLContext
) => {
  ensureAuthenticated(currentUser);

  const request = await friendshipRepo.findOne({
    where: { id: requestId },
    relations: ['recipient'],
  });

  if (!request) {
    throw new GraphQLError('Friend request not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  if (request.recipient.id !== currentUser!.id) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'FORBIDDEN' },
    });
  }

  await friendshipRepo.remove(request);
};

const markFriendRequestAsSeen = async (
  _: any,
  { requestId }: { requestId: string },
  { currentUser, friendshipRepo }: GraphQLContext
) => {
  ensureAuthenticated(currentUser);

  const request = await friendshipRepo.findOne({
    where: { id: requestId },
    relations: ['recipient'],
  });

  if (!request) {
    throw new GraphQLError('Friend request not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  if (request.recipient.id !== currentUser!.id) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'FORBIDDEN' },
    });
  }

  request.isSeen = true;
  await friendshipRepo.save(request);
  // return true;
};

export const friendshipResolvers = {
  Query: {
    getMyFriends,
    getPendingFriendRequests,
    getSentFriendRequest,
  },
  Mutation: {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    markFriendRequestAsSeen,
  },
};
