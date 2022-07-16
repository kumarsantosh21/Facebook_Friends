import { gql } from "@apollo/client";

export const GET_USER_EXIST = gql`
  query MyQuery($email: String) {
    users(where: { useremail: { _eq: $email } }) {
      id
      useremail
    }
  }
`;
