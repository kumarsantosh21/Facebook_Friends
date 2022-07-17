import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query MyQuery($email: String) {
    users(
      order_by: { useremail: asc }
      where: { _not: { useremail: { _eq: $email } } }
    ) {
      id
      useremail
      userimage
      usernickname
      userdisplayname
      userhobbies
      userlocation
      userphonenumber
      userrelationshipstatus
    }
  }
`;
