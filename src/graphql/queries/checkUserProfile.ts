import { gql } from "@apollo/client";

export const CHECK_USER_PROFILE = gql`
  query checkUserProfile($login: String!) {
    user(login: $login) {
      login
    }
  }
`;
