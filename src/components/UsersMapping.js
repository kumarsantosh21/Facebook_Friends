import React from "react";
import checkundefinednull from "../utils/checkundefinednull";
import { useQuery, useMutation, useLazyQuery, gql } from "@apollo/client";

const test = gql`
  query MyQuery {
    connections(where: { currentmail: { _eq: "privacylock4321@gmail.com" } }) {
      id
      currentmail
      useremail
      requeststatus
    }
  }
`;
const UsersMapping = ({ facebookUsers }) => {
  const { data } = useQuery(test);

  console.log(data);
  var userMapping;
  if (checkundefinednull(facebookUsers) && checkundefinednull(data)) {
    userMapping = <div>Loading...</div>;
  } else if (facebookUsers?.length === 0) {
    userMapping = <div>No users found in facebook</div>;
  } else {
    userMapping = facebookUsers?.map((username, index) => {
      //   console.log(username, facebookUsers.length);
      var button = <button>Add friend</button>;
      for (var i = 0; i < data?.connections?.length; i++) {
        if (
          data?.connections[i]?.useremail === username?.useremail &&
          data?.connections[i]?.requeststatus === "accepted"
        ) {
          button = <button key={i}>Unfriend</button>;
        } else if (
          data?.connections[i]?.useremail === username?.useremail &&
          data?.connections[i]?.requeststatus === "rejected"
        ) {
          button = (
            <span key={i}>
              Rejected<button>ok </button>
            </span>
          );
        }
      }

      return (
        <div key={index}>
          <div>
            {username?.usernickname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {button}
          </div>
        </div>
      );
    });
  }
  return <>{userMapping}</>;
};
export default UsersMapping;
