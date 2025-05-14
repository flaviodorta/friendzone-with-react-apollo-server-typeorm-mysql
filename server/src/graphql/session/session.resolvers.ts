import { GraphQLContext } from '../context.ts';
import { GraphQLError } from 'graphql';
import { parseCookies } from '../../utils/fn.ts';

export const sessionResolvers = {
  Query: {
    getSessionFromRefreshToken: async (
      _: any,
      __: any,
      { req, sessionRepo }: GraphQLContext
    ) => {
      const cookies = parseCookies(req.headers.cookie || '');
      const refreshToken =
        cookies['refreshToken'] || req.headers['x-refresh-token'];

      if (!refreshToken) {
        throw new GraphQLError('Refresh token missing', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const session = await sessionRepo.findOne({
        where: { refreshToken },
        relations: ['user'],
      });

      if (!session || session.revoked || session.expiresAt < new Date()) {
        throw new GraphQLError('Invalid or expired session', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      return session;
    },
  },

  Mutation: {
    revokeSession: async (
      _: any,
      { sessionId }: { sessionId: string },
      { currentUser, sessionRepo }: GraphQLContext
    ) => {
      const session = await sessionRepo.findOne({
        where: { id: sessionId },
        relations: ['user'],
      });

      if (!session || session.user.id !== currentUser?.id) {
        throw new GraphQLError('Unauthorized to revoke this session', {
          extensions: { code: 'FORBIDDEN' },
        });
      }

      session.revoked = true;
      await sessionRepo.save(session);
      return true;
    },
  },
};
