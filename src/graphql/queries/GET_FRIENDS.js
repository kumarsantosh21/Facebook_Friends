import { gql } from "@apollo/client";

export const GET_FRIENDS = gql`
  query MyQuery($currentemail: String, $searchvalue: String, $limit: Int) {
    connections(
      where: {
        currentemail: { _eq: $currentemail }
        requeststatus: { _eq: "accepted" }
        user: { userdisplayname: { _ilike: $searchvalue } }
      }
      limit: $limit
      order_by: { useremail: asc }
    ) {
      id
      currentemail
      requeststatus
      useremail
      user {
        id
        userdisplayname
        useremail
        userhobbies
        userimage
        userlocation
        usernickname
        userphonenumber
        userrelationshipstatus
      }
    }
  }
`;
