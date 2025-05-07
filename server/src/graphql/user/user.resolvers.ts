import { User } from '../../typeorm/entities/user.entity.ts';
import { hashPassword } from '../../utils/fn.ts';
import { GraphQLContext } from '../context.ts';

const getUserById = async (
  _: any,
  { id }: { id: string },
  { userRepo }: GraphQLContext
) => {
  return userRepo.findOne({
    where: { id },
  });
};

const createUser = async (
  _: any,
  { data }: { data: Partial<User> },
  { userRepo }: GraphQLContext
) => {
  const existing = await userRepo.findOneBy({ email: data.email });
  const hashedPassword = await hashPassword(data.password!);

  if (existing) throw new Error('Email já em uso.');

  const user = userRepo.create({
    ...data,
    password: hashedPassword,
  });

  return await userRepo.save(user);
};

export const userResolvers = {
  Query: {
    getUserById,
  },
  Mutation: {
    createUser,
  },
};
