import { gql } from "@apollo/client";

export const UPDATE_CONNECTION = gql`
  mutation MyMutation(
    $friendemail: String
    $currentemail: String
    $updatedrequeststatus: String
  ) {
    update_connections(
      where: {
        useremail: { _eq: $friendemail }
        currentemail: { _eq: $currentemail }
      }
      _set: { requeststatus: $updatedrequeststatus }
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
