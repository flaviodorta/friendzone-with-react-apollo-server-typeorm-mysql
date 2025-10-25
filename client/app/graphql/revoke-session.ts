import { gql } from '@apollo/client/index.js';

export const REVOKE_SESSION = gql`
  mutation RevokeSession($sessionId: ID!) {
    revokeSession(sessionId: $sessionId) {
      id
      revoked
    }
  }
`;
