import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_FRIENDS } from "../graphql";
import Navbar from "../layouts/Navbar";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FriendMapper from "../components/FriendMapper";

const Friendsview = () => {
  const { user } = useAuth0();
  const [searchText, setSearchText] = React.useState("%%");
  const [rowsLimit, setRowsLimit] = React.useState(100);
  const [FRIENDS, { data }] = useLazyQuery(GET_FRIENDS, {
    onCompleted: (friendData) => {
      console.log(friendData);
    },
    onError: (e) => {
      console.log(e);
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
  }, [user, searchText]);
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
          fullWidth
          label="Search Friends"
          name="searchtext"
          variant="standard"
          onChange={(e) => {
            setSearchText(`%${e.target.value}%`);
          }}
        />
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
