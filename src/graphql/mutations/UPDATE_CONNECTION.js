import { gql } from "@apollo/client";

export const UPDATE_CONNECTION = gql`
  mutation MyMutation(
    $friendemail: String
    $requeststatus: String
    $currentemail: String
    $updatedrequeststatus: String
  ) {
    update_connections(
      where: {
        useremail: { _eq: $friendemail }
        requeststatus: { _eq: $requeststatus }
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
