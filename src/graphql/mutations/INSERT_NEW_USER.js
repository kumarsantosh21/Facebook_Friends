import { gql } from "@apollo/client";

export const INSERT_NEW_USER = gql`
  mutation MyMutation($email: String, $userimg: String, $nickname: String) {
    insert_users(
      objects: {
        useremail: $email
        userimage: $userimg
        usernickname: $nickname
      }
    ) {
      affected_rows
      returning {
        id
        useremail
        userimage
        usernickname
      }
    }
  }
`;
