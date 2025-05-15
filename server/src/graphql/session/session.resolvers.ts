import { GraphQLContext } from '../context.ts';
import { GraphQLError } from 'graphql';
import { parseCookies } from '../../utils/fn.ts';

export const sessionResolvers = {
  Query: {
    getSessionFromRefreshToken: async (
      _: any,
      __: any,
      { req, sessionRepo, res }: GraphQLContext
    ) => {
      const cookies = parseCookies(req.headers.cookie || '');
      const refreshToken =
        cookies['refreshToken'] || req.headers['x-refresh-token'];
      const userAgent = req.headers['user-agent'] || 'unknown';
      const ip =
        req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unkown';

      if (!refreshToken) {
        throw new GraphQLError('Refresh token missing', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const session = await sessionRepo.findOne({
        where: { refreshToken },
        relations: ['user'],
      });

      if (
        !session ||
        session.revoked ||
        session.expiresAt < new Date() ||
        userAgent !== session.userAgent ||
        ip !== session.ip
      ) {
        throw new GraphQLError('Invalid or expired session', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      if (session && session.expiresAt < new Date()) {
        session.revoked = true;
        await sessionRepo.save(session);
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
