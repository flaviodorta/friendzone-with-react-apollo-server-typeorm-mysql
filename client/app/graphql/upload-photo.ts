import { gql } from '@apollo/client/index.js';

const UPLOAD_PHOTO = gql`
  mutation UploadProfilePhoto($imageBase64: String!) {
    uploadProfilePhoto($imageBase64: $$imageBase64)
  }
`;
