import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_FRIENDS } from "../graphql";
import Navbar from "../layouts/Navbar";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FriendMapper from "../components/FriendMapper";
import { sendErrorToSentry } from "../client";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";

const Friendsview = () => {
  document.title = "Friends | facebook";
  const { user } = useAuth0();
  const [searchText, setSearchText] = React.useState("%%");
  const [rowsLimit, setRowsLimit] = React.useState(100);
  const [searchTrigger, setSearchTrigger] = React.useState(false);
  const [FRIENDS, { data }] = useLazyQuery(GET_FRIENDS, {
    onCompleted: (friendData) => {
      // console.log(friendData);
    },
    onError: (e) => {
      console.log(e);
      sendErrorToSentry({
        name: "Friend List",
        message: "Fetching friend list failed",
        extra: [{ type: "errorEncounter", e }],
      });
    },
    fetchPolicy: "network-only",
  });
  React.useEffect(() => {
    if (user?.email) {
      FRIENDS({
        variables: {
          currentemail: user?.email,
          searchvalue: searchText,
          limit: rowsLimit,
        },
      });
    }
  }, [user, searchTrigger]);
  console.log(searchText);
  const handleRefresh = () => {
    FRIENDS({
      variables: {
        currentemail: user?.email,
        searchvalue: searchText,
        limit: rowsLimit,
      },
    });
  };
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
        <SearchIcon sx={{ marginRight: "5px" }} />
        <TextField
          id="searchtextfield"
          fullWidth
          label="Search Friends"
          name="searchtext"
          variant="standard"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchText(`%${e.target.value}%`);
              setSearchTrigger(!searchTrigger);
            }
          }}
        />
        <IconButton
          sx={{ marginLeft: "10px", marginRight: "5px" }}
          onClick={handleRefresh}
        >
          <RefreshIcon />
        </IconButton>
      </div>
      <FriendMapper
        friendlist={data?.connections}
        currentuser={user?.email}
        handleRefresh={handleRefresh}
      />
    </>
  );
};
export default Friendsview;
