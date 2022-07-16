import { gql } from "@apollo/client";

export const INSERT_NEW_CONNECTION = gql`
  mutation MyMutation(
    $friendemail: String
    $requeststatus: String
    $currentemail: String
  ) {
    insert_connections(
      objects: {
        useremail: $friendemail
        requeststatus: $requeststatus
        currentemail: $currentemail
      }
    ) {
      affected_rows
      returning {
        id
        useremail
        requeststatus
        currentemail
      }
    }
  }
`;
