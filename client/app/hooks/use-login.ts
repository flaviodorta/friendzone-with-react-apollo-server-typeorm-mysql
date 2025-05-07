import { useMutation } from '@apollo/client/index.js';
import { LOGIN_MUTATION } from '~/graphql/login';

export const useLogin = () => {
  return useMutation(LOGIN_MUTATION);
};
