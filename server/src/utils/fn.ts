import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, 'JWT_SECRET', { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, 'JWT_SECRET', { expiresIn: '30d' });

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, 'JWT_SECRET');
    return decoded;
  } catch {
    return null;
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const parseCookies = (cookieHeader: string): Record<string, string> => {
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map((c) => c.trim().split('='))
      .filter((arr) => arr.length === 2)
  );
};
