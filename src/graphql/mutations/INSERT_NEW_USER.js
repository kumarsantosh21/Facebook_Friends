import { gql } from "@apollo/client";

export const INSERT_NEW_USER = gql`
  mutation MyMutation(
    $email: String
    $userimg: String
    $nickname: String
    $userdisplayname: String
    $userphonenumber: String
    $userlocation: String
    $userhobbies: String
    $userrelationship: String
  ) {
    insert_users(
      objects: {
        useremail: $email
        userimage: $userimg
        usernickname: $nickname
        userdisplayname: $userdisplayname
        userphonenumber: $userphonenumber
        userlocation: $userlocation
        userhobbies: $userhobbies
        userrelationshipstatus: $userrelationship
      }
    ) {
      affected_rows
      returning {
        id
        userphonenumber
        userdisplayname
        userhobbies
        useremail
        userimage
        usernickname
        userrelationshipstatus
        userlocation
      }
    }
  }
`;
