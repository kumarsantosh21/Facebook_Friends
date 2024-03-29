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
import { useMutation, useLazyQuery } from "@apollo/client";
import {
  GET_USER_CONNECTIONS,
  DELETE_CONNECTION,
  GET_USERS,
  INSERT_NEW_CONNECTION,
  UPDATE_CONNECTION,
} from "../graphql";
import { sendErrorToSentry } from "../client";
import Loading from "../assets/Loading";
import Grid from "@mui/material/Grid";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
      sendErrorToSentry({
        name: "currenuser connections",
        message: "Fetching connection failed",
        extra: [{ type: "errorEncounter", e }],
      });
    },
    fetchPolicy: "network-only",
  });

  React.useEffect(() => {
    if (currentUserEmail) {
      CONNECTIONS();
    }
  }, [currentUserEmail]);
  React.useEffect(() => {
    setInterval(() => {
      CONNECTIONS();
    }, 5000);
  }, []);

  const [ACKNOWLEDGEMENT_DELETE, {}] = useMutation(DELETE_CONNECTION, {
    onCompleted: () => {
      CONNECTIONS();
    },
    onError: (e) => {
      console.log(e);
      setDisable(false);
      sendErrorToSentry({
        name: "Delete both connections",
        message: "connection removing failed",
        extra: [{ type: "errorEncounter", e }],
      });
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
      sendErrorToSentry({
        name: "Add connection to current user",
        message: "connection insertion failed",
        extra: [{ type: "errorEncounter", e }],
      });
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
      sendErrorToSentry({
        name: "Update connection",
        message: "Update connection failed",
        extra: [{ type: "errorEncounter", e }],
      });
    },
    fetchPolicy: "network-only",
  });
  const buttonStyle = { textTransform: "none", borderRadius: "8px" };
  const handleDelete = (e) => {
    setDisable(true);
    // console.log(e.currentTarget.id);
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

    // console.log(e.currentTarget.id);
    const updatedVariables = e.currentTarget.id.split(",,-");
    // console.log(updatedVariables);
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

    // console.log(e.currentTarget.id);
    const addVariables = e.currentTarget.id.split(",,-");
    // console.log(addVariables);

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
  if (checkundefinednull(facebookUsers) || checkundefinednull(data)) {
    userMapping = <Loading />;
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
                cursor: "pointer",
              }}
            >
              more info
            </Typography>
          </Tooltip>
        </>
      );
      var button = (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <Typography sx={{ marginRight: "5px" }}>Relationship -</Typography>
            <Typography>{username?.userrelationshipstatus}</Typography>
          </div>
          {nonfriendhover}
          <Button
            sx={{ ...buttonStyle, marginTop: "10px" }}
            disabled={disable}
            key={index}
            id={`${
              username?.useremail
            }${",,-"}${"sent_add_me_as_friend"}${",,-"}${currentUserEmail}`}
            onClick={handleInsert}
            color="success"
          >
            <PersonAddAlt1Icon sx={{ marginRight: "5px" }} /> Add friend
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
                color="error"
              >
                <PersonRemoveIcon sx={{ marginRight: "7px" }} /> Unfriend
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
              {nonfriendhover}
              <Typography
                key={i}
                sx={{ fontSize: "12px", marginLeft: "10px", marginTop: "10px" }}
              >
                Friend request sent
                <Button
                  sx={{ ...buttonStyle }}
                  disabled={disable}
                  id={`${data?.connections[i]?.useremail}${",,-"}${
                    data?.connections[i]?.requeststatus
                  }${",,-"}${currentUserEmail}`}
                  onClick={handleDelete}
                  color="error"
                >
                  <CancelOutlinedIcon sx={{ marginRight: "5px" }} /> Cancel
                  request
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
              {nonfriendhover}
              <Typography
                key={i}
                sx={{ fontSize: "12px", marginLeft: "10px", marginTop: "10px" }}
              >
                Accept friend request
              </Typography>
              <Button
                sx={{ ...buttonStyle }}
                disabled={disable}
                id={`${data?.connections[i]?.useremail}${",,-"}${
                  data?.connections[i]?.requeststatus
                }${",,-"}${currentUserEmail}`}
                onClick={handleUpdate}
                color="success"
              >
                <CheckOutlinedIcon sx={{ marginRight: "5px" }} /> Accept
              </Button>
              <Button
                sx={{ ...buttonStyle }}
                disabled={disable}
                id={`${data?.connections[i]?.useremail}${",,-"}${
                  data?.connections[i]?.requeststatus
                }${",,-"}${currentUserEmail}`}
                onClick={handleDelete}
                color="error"
              >
                <DeleteOutlineIcon sx={{ marginRight: "5px" }} /> Reject
              </Button>
            </>
          );
        }
      }

      return (
        <Grid key={index} item xs={3}>
          <div
            style={{
              boxShadow: "rgb(0 0 0) 0px 0px 2px",
              height: "235px",
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
                fontWeight: "bold",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                {username?.userdisplayname}
              </Typography>
              <img
                style={{ borderRadius: "50%" }}
                src={username?.userimage}
                alt="userimage"
                width={40}
              />
            </div>
            {button}
          </div>
        </Grid>
      );
    });
  }
  return (
    <>
      <Typography sx={{ margin: "15px" }}>
        All avialabe facebook users
      </Typography>
      <Grid container spacing={4} sx={{ width: "96%", margin: "1%" }}>
        {userMapping}
      </Grid>
    </>
  );
};
export default UsersMapping;
