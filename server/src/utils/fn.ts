import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../typeorm/entities/user.entity.ts';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    {
      userId,
    },
    JWT_REFRESH_SECRET,
    { expiresIn: '10s' }
  );
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    return decoded as { userId: string };
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

export const ensureAuthenticated = (currenttUser: User | null) => {
  if (!currenttUser) {
    throw new GraphQLError('Access token expired or missing.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
};
