import { comparePassword, generateTokens } from '../../utils/fn.ts';
import { GraphQLContext } from '../context.ts';

const login = async (
  _: any,
  { email, password }: { email: string; password: string },
  { req, res, userRepo, sessionRepo }: GraphQLContext
) => {
  const user = await userRepo.findOneBy({ email });

  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error('Credenciais inválidas');
  }

  const { accessToken, refreshToken } = generateTokens(user.id);

  const userAgent = req.headers['user-agent'] || 'unknown';
  const ip =
    req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unkown';
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const session = sessionRepo.create({
    user,
    refreshToken,
    userAgent,
    ip: Array.isArray(ip) ? ip[0] : ip,
    expiresAt,
  });

  await sessionRepo.save(session);

  res.setHeader('Set-Cookie', [
    `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict; Secure`,
    `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict; Secure`,
  ]);

  return {
    accessToken,
    user,
  };
};

export const authResolvers = {
  Mutation: {
    login,
  },
};
