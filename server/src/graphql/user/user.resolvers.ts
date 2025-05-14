import { ILike } from 'typeorm';
import { User } from '../../typeorm/entities/user.entity.ts';
import { hashPassword } from '../../utils/fn.ts';
import { GraphQLContext } from '../context.ts';

// query

const getUserById = async (
  _: any,
  { id }: { id: string },
  { userRepo }: GraphQLContext
) => {
  return userRepo.findOne({
    where: { id },
  });
};

const getUsersByName = async (
  _: any,
  { name }: { name: string },
  { userRepo }: GraphQLContext
) => {
  // Busca pelo nome OU sobrenome que contenha a string (case-insensitive)
  return await userRepo.find({
    where: [
      { firstName: ILike(`%${name}%`) },
      { lastName: ILike(`%${name}%`) },
    ],
    order: { firstName: 'ASC' },
  });
};

// mutation

const createUser = async (
  _: any,
  { email, password, firstName, lastName, gender, birthday }: Partial<User>,
  { userRepo }: GraphQLContext
) => {
  console.log('here');
  const existing = await userRepo.findOneBy({ email: email });
  const hashedPassword = await hashPassword(password!);

  if (existing) throw new Error('Email já em uso.');

  const user = userRepo.create({
    email,
    firstName,
    lastName,
    gender,
    birthday,
    password: hashedPassword,
  });

  return await userRepo.save(user);
};

export const userResolvers = {
  Query: {
    getUserById,
    getUsersByName,
  },
  Mutation: {
    createUser,
  },
};
