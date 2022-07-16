import { gql } from "@apollo/client";

export const DELETE_CONNECTION = gql`
  mutation MyMutation(
    $friendemail: String
    $requeststatus: String
    $currentemail: String
  ) {
    delete_connections(
      where: {
        useremail: { _eq: $friendemail }
        requeststatus: { _eq: $requeststatus }
        currentemail: { _eq: $currentemail }
      }
    ) {
      affected_rows
      returning {
        currentemail
        id
        requeststatus
        useremail
      }
    }
  }
`;
