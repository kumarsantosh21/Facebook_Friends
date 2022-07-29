import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMutation } from "@apollo/client";
import { INSERT_NEW_USER } from "../graphql";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { sendErrorToSentry } from "../client";

const NewUserPage = ({ currentuser }) => {
  document.title = "Welcome | facebook";
  const navigate = useNavigate();
  const [welcomeData, setWelcomeData] = React.useState({
    displayname: "",
    location: "",
    hobbies: "",
    phonenumber: "",
    relationshipstatus: "",
  });
  const [disable, setDisable] = React.useState(false);
  const [INSERTING_USER, { loading }] = useMutation(INSERT_NEW_USER, {
    onCompleted: () => {
      setDisable(false);
      navigate("/");
    },
    onError: (e) => {
      console.log(e);
      setDisable(false);
      sendErrorToSentry({
        name: "New user insertion",
        message: "Inserting new user to db",
        extra: [{ type: "errorEncounter", e }],
      });
    },
    fetchPolicy: "network-only",
  });
  const handleChangle = (e) => {
    const { name, value } = e.target;
    setWelcomeData({ ...welcomeData, [name]: value });
  };
  const handleClick = () => {
    setDisable(true);
    INSERTING_USER({
      variables: {
        email: currentuser?.email,
        userimg: currentuser?.picture,
        nickname: currentuser?.nickname,
        userdisplayname: welcomeData.displayname,
        userphonenumber: welcomeData.phonenumber,
        userlocation: welcomeData.location,
        userhobbies: welcomeData.hobbies,
        userrelationship: welcomeData.relationshipstatus,
      },
    });
  };

  return (
    <Stack
      sx={{ alignItems: "center", marginTop: "5%", marginBottom: "100px" }}
    >
      <Stack sx={{ width: "50%" }} spacing={3} direction="column">
        <Typography sx={{ textAlign: "center  " }} variant="h6" gutterBottom>
          Welcome to Facebook
        </Typography>
        <TextField
          required
          label="Display name"
          name="displayname"
          variant="standard"
          onChange={handleChangle}
        />
        <TextField
          required
          label="Location"
          name="location"
          variant="standard"
          onChange={handleChangle}
        />
        <TextField
          required
          label="Hobbies"
          name="hobbies"
          variant="standard"
          onChange={handleChangle}
        />
        <TextField
          required
          label="Phone number"
          name="phonenumber"
          type={"number"}
          variant="standard"
          onChange={handleChangle}
          placeholder={"enter 10 digits"}
        />
        <TextField
          required
          label="Relationship status"
          name="relationshipstatus"
          variant="standard"
          onChange={handleChangle}
        />
        <LoadingButton
          sx={{ textTransform: "none" }}
          loading={loading}
          disabled={
            welcomeData.displayname === "" ||
            welcomeData.location === "" ||
            welcomeData.hobbies === "" ||
            welcomeData.phonenumber === "" ||
            welcomeData.relationshipstatus === "" ||
            welcomeData.phonenumber.length <= 9 ||
            disable
          }
          variant="contained"
          onClick={handleClick}
        >
          Get Started
        </LoadingButton>
      </Stack>
    </Stack>
  );
};
export default NewUserPage;
