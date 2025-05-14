import { useMutation } from '@apollo/client/index.js';
import { CREATE_USER } from '~/graphql/create-user';

export const useCreateUser = () => {
  return useMutation(CREATE_USER);
};
