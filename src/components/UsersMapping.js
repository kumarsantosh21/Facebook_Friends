import React from "react";
import checkundefinednull from "../utils/checkundefinednull";
import { useQuery, useMutation, useLazyQuery, gql } from "@apollo/client";
import {
  GET_USER_CONNECTIONS,
  DELETE_CONNECTION,
  GET_USERS,
  INSERT_NEW_CONNECTION,
  UPDATE_CONNECTION,
} from "../graphql";

const UsersMapping = ({ facebookUsers, currentUserEmail }) => {
  const [CONNECTIONS, { data }] = useLazyQuery(GET_USER_CONNECTIONS, {
    variables: { email: currentUserEmail },
    onError: (e) => {
      console.log(e);
    },
    fetchPolicy: "network-only",
  });

  console.log(data);
  React.useEffect(() => {
    if (currentUserEmail) {
      CONNECTIONS();
    }
  }, []);

  const [ACKNOWLEDGEMENT_DELETE, {}] = useMutation(DELETE_CONNECTION, {
    onCompleted: () => {
      CONNECTIONS();
    },
    onError: (e) => {
      console.log(e);
    },
    fetchPolicy: "network-only",
  });
  const [NEW_CONNECTION, {}] = useMutation(INSERT_NEW_CONNECTION, {
    onCompleted: () => {
      CONNECTIONS();
    },
    onError: (e) => {
      console.log(e);
    },
    fetchPolicy: "network-only",
  });
  const [UPDATE_CONNECTION_STATUS, {}] = useMutation(UPDATE_CONNECTION, {
    onCompleted: () => {
      CONNECTIONS();
    },
    onError: (e) => {
      console.log(e);
    },
    fetchPolicy: "network-only",
  });

  var userMapping;

  if (checkundefinednull(facebookUsers) && checkundefinednull(data)) {
    userMapping = <div>Loading...</div>;
  } else if (facebookUsers?.length === 0) {
    userMapping = <div>No users found in facebook</div>;
  } else {
    userMapping = facebookUsers?.map((username, index) => {
      //   console.log(username, facebookUsers.length);
      var button = (
        <button
          key={index}
          id={`${
            username?.useremail
          }${",,-"}${"sent_add_me_as_friend"}${",,-"}${currentUserEmail}`}
          onClick={(e) => {
            console.log(e.currentTarget.id);
            const addVariables = e.currentTarget.id.split(",,-");
            console.log(addVariables);
            NEW_CONNECTION({
              variables: {
                friendemail: addVariables?.[2],
                requeststatus: addVariables?.[1],
                currentemail: addVariables?.[0],
              },
            });
            NEW_CONNECTION({
              variables: {
                friendemail: addVariables?.[0],
                requeststatus: "request_sent",
                currentemail: addVariables?.[2],
              },
            });
          }}
        >
          Add friend
        </button>
      );
      for (var i = 0; i < data?.connections?.length; i++) {
        if (
          data?.connections[i]?.useremail === username?.useremail &&
          data?.connections[i]?.requeststatus === "accepted"
        ) {
          button = (
            <button
              key={i}
              id={`${data?.connections[i]?.useremail}${",,-"}${
                data?.connections[i]?.requeststatus
              }${",,-"}${currentUserEmail}`}
              onClick={(e) => {
                console.log(e.currentTarget.id);
                const deleteVariables = e.currentTarget.id.split(",,-");
                ACKNOWLEDGEMENT_DELETE({
                  variables: {
                    friendemail: deleteVariables?.[0],
                    requeststatus: deleteVariables?.[1],
                    currentemail: deleteVariables?.[2],
                  },
                });
                ACKNOWLEDGEMENT_DELETE({
                  variables: {
                    friendemail: deleteVariables?.[2],
                    requeststatus: deleteVariables?.[1],
                    currentemail: deleteVariables?.[0],
                  },
                });
              }}
            >
              Unfriend
            </button>
          );
        } else if (
          data?.connections[i]?.useremail === username?.useremail &&
          data?.connections[i]?.requeststatus === "rejected"
        ) {
          button = (
            <span
              key={i}
              id={`${data?.connections[i]?.useremail}${",,-"}${
                data?.connections[i]?.requeststatus
              }${",,-"}${currentUserEmail}`}
              onClick={(e) => {
                console.log(e.currentTarget.id);
                const deleteVariables = e.currentTarget.id.split(",,-");
                ACKNOWLEDGEMENT_DELETE({
                  variables: {
                    friendemail: deleteVariables?.[0],
                    requeststatus: deleteVariables?.[1],
                    currentemail: deleteVariables?.[2],
                  },
                });
                ACKNOWLEDGEMENT_DELETE({
                  variables: {
                    friendemail: deleteVariables?.[2],
                    requeststatus: deleteVariables?.[1],
                    currentemail: deleteVariables?.[0],
                  },
                });
              }}
            >
              Rejected<button>ok </button>
            </span>
          );
        } else if (
          data?.connections[i]?.useremail === username?.useremail &&
          data?.connections[i]?.requeststatus === "request_sent"
        ) {
          button = <span>Friend Request Sent</span>;
        } else if (
          data?.connections[i]?.useremail === username?.useremail &&
          data?.connections[i]?.requeststatus === "sent_add_me_as_friend"
        ) {
          button = (
            <>
              <span key={i}>Accept friend request</span>
              <button
                id={`${data?.connections[i]?.useremail}${",,-"}${
                  data?.connections[i]?.requeststatus
                }${",,-"}${currentUserEmail}`}
                onClick={(e) => {
                  console.log(e.currentTarget.id);
                  const updatedVariables = e.currentTarget.id.split(",,-");
                  console.log(updatedVariables);
                  UPDATE_CONNECTION_STATUS({
                    variables: {
                      friendemail: updatedVariables?.[0],
                      requeststatus: updatedVariables?.[1],
                      currentemail: updatedVariables?.[2],
                      updatedrequeststatus: "accepted",
                    },
                  });
                  UPDATE_CONNECTION_STATUS({
                    variables: {
                      friendemail: updatedVariables?.[2],
                      requeststatus: "request_sent",
                      currentemail: updatedVariables?.[0],
                      updatedrequeststatus: "accepted",
                    },
                  });
                }}
              >
                Accept
              </button>
              <button
                id={`${data?.connections[i]?.useremail}${",,-"}${
                  data?.connections[i]?.requeststatus
                }${",,-"}${currentUserEmail}`}
                onClick={(e) => {
                  console.log(e.currentTarget.id);
                  const updatedVariables = e.currentTarget.id.split(",,-");
                  console.log(updatedVariables);
                  UPDATE_CONNECTION_STATUS({
                    variables: {
                      friendemail: updatedVariables?.[0],
                      requeststatus: updatedVariables?.[1],
                      currentemail: updatedVariables?.[2],
                      updatedrequeststatus: "rejected",
                    },
                  });
                  UPDATE_CONNECTION_STATUS({
                    variables: {
                      friendemail: updatedVariables?.[2],
                      requeststatus: "request_sent",
                      currentemail: updatedVariables?.[0],
                      updatedrequeststatus: "rejected",
                    },
                  });
                }}
              >
                Reject
              </button>
            </>
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
