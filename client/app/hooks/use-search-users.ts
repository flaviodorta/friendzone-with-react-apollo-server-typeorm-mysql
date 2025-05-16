import { useLazyQuery } from '@apollo/client/index.js';
import { GET_USERS_BY_NAME } from '~/graphql/get-users-by-name';

export const useSearchUsers = () => {
  return useLazyQuery(GET_USERS_BY_NAME);
};
