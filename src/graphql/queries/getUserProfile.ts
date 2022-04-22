import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query getUserProfile($login: String!) {
    user(login: $login) {
      avatarUrl
      login
      name
      email
      twitterUsername
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 10) {
        nodes {
          nameWithOwner
          description
          languages(first: 1) {
            nodes {
              color
              name
            }
          }
        }
      }
    }
  }
`;
