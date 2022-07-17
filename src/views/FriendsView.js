import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_FRIENDS } from "../graphql";
import Navbar from "../layouts/Navbar";

const Friendsview = () => {
  const { user } = useAuth0();
  const [searchText, setSearchText] = React.useState("%%");
  const [rowsLimit, setRowsLimit] = React.useState(10);
  const [Friends, { data, loading }] = useLazyQuery(GET_FRIENDS, {
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
      Friends({
        variables: {
          currentemail: user?.email,
          searchvalue: searchText,
          limit: rowsLimit,
        },
      });
    }
  }, [user]);

  const friendsMapper =
    data &&
    data?.connections.map((friend, index) => {
      return (
        <div key={index}>
          <div>{friend?.user?.useremail}</div>
          <div>
            <img src={friend?.user?.userimage} alt="profile_pic" />
          </div>
          <div>{friend?.user?.userdisplayname}</div>
          <div>{friend?.user?.userlocation}</div>
        </div>
      );
    });
  return (
    <>
      <Navbar />
      {loading ? <div>Loading...</div> : friendsMapper}
    </>
  );
};
export default Friendsview;
// {
//   "id": 20,
//   "userdisplayname": "san",
//   "useremail": "san@123.com",
//   "userhobbies": "writing",
//   "userimage": "https://s.gravatar.com/avatar/0b2c2be6ceb296593749c2ece08a6a96?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png",
//   "userlocation": "punjab",
//   "usernickname": "san",
//   "userphonenumber": "1234567891",
//   "userrelationshipstatus": "single",
//   "__typename": "users"
// }
