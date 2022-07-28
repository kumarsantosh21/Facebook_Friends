import React from "react";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Stack from "@mui/material/Stack";
import checkundefinednull from "../utils/checkundefinednull";
import { useMutation, useLazyQuery } from "@apollo/client";
import { DELETE_CONNECTION, GET_USER_CONNECTIONS } from "../graphql";
import Button from "@mui/material/Button";
import { sendErrorToSentry } from "../client";
import Loading from "../assets/Loading";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const FriendMapper = ({ friendlist, currentuser, handleRefresh }) => {
  const [disable, setDisable] = React.useState(false);
  const [ACKNOWLEDGEMENT_DELETE, {}] = useMutation(DELETE_CONNECTION, {
    onCompleted: () => {
      handleRefresh();
      CONNECTIONS();
    },
    onError: (e) => {
      console.log(e);
      setDisable(false);
      sendErrorToSentry({
        name: "Delete connection",
        message: "Delete connection failed",
        extra: [{ type: "errorEncounter", e }],
      });
    },
    fetchPolicy: "network-only",
  });
  const [CONNECTIONS, { data }] = useLazyQuery(GET_USER_CONNECTIONS, {
    variables: { email: currentuser },
    onCompleted: () => {
      setDisable(false);
    },
    onError: (e) => {
      console.log(e);
      setDisable(false);
      sendErrorToSentry({
        name: "currenuser connection",
        message: "Fetching connection failed",
        extra: [{ type: "errorEncounter", e }],
      });
    },
    fetchPolicy: "network-only",
  });

  var friends;
  if (checkundefinednull(friendlist) || checkundefinednull(currentuser)) {
    friends = <Loading />;
  } else if (friendlist?.length === 0) {
    friends = <div>You have no friends or No friend with such name</div>;
  } else {
    friends = friendlist?.map((friend, index) => {
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
            <Typography>{friend?.user?.userdisplayname}</Typography>
            <img
              style={{ borderRadius: "50%" }}
              src={friend?.user?.userimage}
              alt="userimage"
              width={40}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", margin: "10px" }}
          >
            <LocationOnIcon sx={{ marginRight: "5px" }} />{" "}
            <Typography>{friend?.user?.userlocation}</Typography>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", margin: "10px" }}
          >
            <PhoneIcon sx={{ marginRight: "5px" }} />{" "}
            <Typography>{friend?.user?.userphonenumber}</Typography>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", margin: "10px" }}
          >
            <LocalActivityIcon sx={{ marginRight: "5px" }} />
            <Typography>{friend?.user?.userhobbies}</Typography>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <PeopleAltIcon sx={{ marginRight: "5px" }} />
            <Button
              sx={{ textTransform: "none", borderRadius: "8px" }}
              disabled={disable}
              onClick={() => {
                setDisable(true);
                ACKNOWLEDGEMENT_DELETE({
                  variables: {
                    friendemail: currentuser,
                    currentemail: friend?.user?.useremail,
                  },
                });
                ACKNOWLEDGEMENT_DELETE({
                  variables: {
                    friendemail: friend?.user?.useremail,
                    currentemail: currentuser,
                  },
                });
              }}
              color="error"
            >
              unfriend <PersonRemoveIcon sx={{ marginLeft: "7px" }} />
            </Button>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", margin: "10px" }}
          >
            <Typography sx={{ marginRight: "5px" }}>Relationship -</Typography>
            <Typography>{friend?.user?.userrelationshipstatus}</Typography>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <Stack sx={{ margin: "15px" }} spacing={3} direction="row">
        {friends}
      </Stack>
    </>
  );
};
export default FriendMapper;
