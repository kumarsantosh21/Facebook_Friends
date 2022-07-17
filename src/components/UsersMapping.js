import React from "react";
import checkundefinednull from "../utils/checkundefinednull";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useQuery, useMutation, useLazyQuery, gql } from "@apollo/client";
import {
  GET_USER_CONNECTIONS,
  DELETE_CONNECTION,
  GET_USERS,
  INSERT_NEW_CONNECTION,
  UPDATE_CONNECTION,
} from "../graphql";

const UsersMapping = ({ facebookUsers, currentUserEmail }) => {
  const [disable, setDisable] = React.useState(false);
  const [CONNECTIONS, { data }] = useLazyQuery(GET_USER_CONNECTIONS, {
    variables: { email: currentUserEmail },
    onCompleted: () => {
      setDisable(false);
    },
    onError: (e) => {
      console.log(e);
      setDisable(false);
    },
    fetchPolicy: "network-only",
  });

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
      setDisable(false);
    },
    fetchPolicy: "network-only",
  });
  const [NEW_CONNECTION, {}] = useMutation(INSERT_NEW_CONNECTION, {
    onCompleted: () => {
      CONNECTIONS();
    },
    onError: (e) => {
      console.log(e);
      setDisable(false);
    },
    fetchPolicy: "network-only",
  });
  const [UPDATE_CONNECTION_STATUS, {}] = useMutation(UPDATE_CONNECTION, {
    onCompleted: () => {
      CONNECTIONS();
    },
    onError: (e) => {
      console.log(e);
      setDisable(false);
    },
    fetchPolicy: "network-only",
  });
  const buttonStyle = { textTransform: "none" };
  const handleDelete = (e) => {
    setDisable(true);
    console.log(e.currentTarget.id);
    const deleteVariables = e.currentTarget.id.split(",,-");
    ACKNOWLEDGEMENT_DELETE({
      variables: {
        friendemail: deleteVariables?.[0],
        currentemail: deleteVariables?.[2],
      },
    });
    ACKNOWLEDGEMENT_DELETE({
      variables: {
        friendemail: deleteVariables?.[2],
        currentemail: deleteVariables?.[0],
      },
    });
  };
  const handleUpdate = (e) => {
    setDisable(true);

    console.log(e.currentTarget.id);
    const updatedVariables = e.currentTarget.id.split(",,-");
    console.log(updatedVariables);
    UPDATE_CONNECTION_STATUS({
      variables: {
        friendemail: updatedVariables?.[0],
        currentemail: updatedVariables?.[2],
        updatedrequeststatus: "accepted",
      },
    });
    UPDATE_CONNECTION_STATUS({
      variables: {
        friendemail: updatedVariables?.[2],
        currentemail: updatedVariables?.[0],
        updatedrequeststatus: "accepted",
      },
    });
  };
  const handleInsert = (e) => {
    setDisable(true);

    console.log(e.currentTarget.id);
    const addVariables = e.currentTarget.id.split(",,-");
    console.log(addVariables);

    NEW_CONNECTION({
      variables: {
        friendemail: addVariables?.[0],
        requeststatus: "request_sent",
        currentemail: addVariables?.[2],
      },
    });
    NEW_CONNECTION({
      variables: {
        friendemail: addVariables?.[2],
        requeststatus: addVariables?.[1],
        currentemail: addVariables?.[0],
      },
    });
  };
  var userMapping;
  if (checkundefinednull(facebookUsers) && checkundefinednull(data)) {
    userMapping = <div>Loading...</div>;
  } else if (facebookUsers?.length === 0) {
    userMapping = <div>No users found in facebook</div>;
  } else {
    userMapping = facebookUsers?.map((username, index) => {
      //   console.log(username, facebookUsers.length);
      const nonfriendhover = (
        <>
          <Tooltip
            arrow
            TransitionComponent={Zoom}
            title="Restricted due to not a friend"
            placement="right"
          >
            <Typography
              sx={{
                maxWidth: "fit-content",
                textDecoration: "underline",
                fontSize: "13px",
                marginLeft: "8px",
                color: "lightblue",
              }}
            >
              more info
            </Typography>
          </Tooltip>
        </>
      );
      var button = (
        <>
          {nonfriendhover}
          <Button
            sx={{ ...buttonStyle }}
            disabled={disable}
            key={index}
            id={`${
              username?.useremail
            }${",,-"}${"sent_add_me_as_friend"}${",,-"}${currentUserEmail}`}
            onClick={handleInsert}
          >
            Add friend
          </Button>
        </>
      );
      for (var i = 0; i < data?.connections?.length; i++) {
        if (
          data?.connections[i]?.useremail === username?.useremail &&
          data?.connections[i]?.requeststatus === "accepted"
        ) {
          button = (
            <>
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  <LocationOnIcon sx={{ marginRight: "5px" }} />{" "}
                  <Typography>{username?.userlocation}</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  <PhoneIcon sx={{ marginRight: "5px" }} />{" "}
                  <Typography>{username?.userphonenumber}</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  <LocalActivityIcon sx={{ marginRight: "5px" }} />
                  <Typography>{username?.userhobbies}</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  <Typography sx={{ marginRight: "5px" }}>
                    Relationship -
                  </Typography>
                  <Typography>{username?.userrelationshipstatus}</Typography>
                </div>
              </>
              <Button
                sx={{ ...buttonStyle }}
                disabled={disable}
                key={i}
                id={`${data?.connections[i]?.useremail}${",,-"}${
                  data?.connections[i]?.requeststatus
                }${",,-"}${currentUserEmail}`}
                onClick={handleDelete}
              >
                Unfriend
              </Button>
            </>
          );
        } else if (
          data?.connections[i]?.useremail === username?.useremail &&
          data?.connections[i]?.requeststatus === "rejected"
        ) {
          // experiment (not needed)
          button = (
            <>
              {nonfriendhover}
              <span key={i}>
                Rejected
                <Button
                  sx={{ ...buttonStyle }}
                  disabled={disable}
                  id={`${data?.connections[i]?.useremail}${",,-"}${
                    data?.connections[i]?.requeststatus
                  }${",,-"}${currentUserEmail}`}
                  onClick={handleDelete}
                >
                  ok
                </Button>
              </span>
            </>
          );
        } else if (
          data?.connections[i]?.useremail === username?.useremail &&
          data?.connections[i]?.requeststatus === "request_sent"
        ) {
          button = (
            <>
              {nonfriendhover}
              <Typography key={i}>
                Friend Request Sent
                <Button
                  sx={{ ...buttonStyle }}
                  disabled={disable}
                  id={`${data?.connections[i]?.useremail}${",,-"}${
                    data?.connections[i]?.requeststatus
                  }${",,-"}${currentUserEmail}`}
                  onClick={handleDelete}
                >
                  Cancel request
                </Button>
              </Typography>
            </>
          );
        } else if (
          data?.connections[i]?.useremail === username?.useremail &&
          data?.connections[i]?.requeststatus === "sent_add_me_as_friend"
        ) {
          button = (
            <>
              {nonfriendhover}
              <Typography key={i}>Accept friend request</Typography>
              <Button
                sx={{ ...buttonStyle }}
                disabled={disable}
                id={`${data?.connections[i]?.useremail}${",,-"}${
                  data?.connections[i]?.requeststatus
                }${",,-"}${currentUserEmail}`}
                onClick={handleUpdate}
              >
                Accept
              </Button>
              <Button
                sx={{ ...buttonStyle }}
                disabled={disable}
                id={`${data?.connections[i]?.useremail}${",,-"}${
                  data?.connections[i]?.requeststatus
                }${",,-"}${currentUserEmail}`}
                onClick={handleDelete}
              >
                Reject
              </Button>
            </>
          );
        }
      }

      return (
        <div
          key={index}
          style={{
            boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
            width: "20%",
            overflow: "hidden",
            borderRadius: "6px",
            padding: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "5px",
            }}
          >
            <Typography>{username?.userdisplayname}</Typography>
            <img
              style={{ borderRadius: "50%" }}
              src={username?.userimage}
              alt="userimage"
              width={40}
            />
          </div>
          {button}
        </div>
      );
    });
  }
  return (
    <>
      <Typography sx={{ margin: "15px" }}>
        All avialabe facebook users
      </Typography>
      <Stack sx={{ margin: "15px" }} spacing={3} direction="row">
        {userMapping}
      </Stack>
    </>
  );
};
export default UsersMapping;
