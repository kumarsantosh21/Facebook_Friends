import { gql } from "@apollo/client";

export const DELETE_CONNECTION = gql`
  mutation MyMutation($friendemail: String, $currentemail: String) {
    delete_connections(
      where: {
        useremail: { _eq: $friendemail }
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
