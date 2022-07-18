import { gql } from "@apollo/client";

export const GET_USER_CONNECTIONS = gql`
  query MyQuery($email: String) {
    connections(
      order_by: { id: desc }
      where: { currentemail: { _eq: $email } }
    ) {
      id
      currentemail
      useremail
      requeststatus
    }
  }
`;
