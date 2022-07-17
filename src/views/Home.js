import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_USER_EXIST, GET_USERS, INSERT_NEW_USER } from "../graphql";
import UsersMapping from "../components/UsersMapping";
import NewUserPage from "../components/NewUserPage";
import Navbar from "../layouts/Navbar";

const Home = () => {
  const [userState, setUserState] = React.useState();
  const { user, isAuthenticated, logout } = useAuth0();

  document.title = "Home";
  const [facebookUsers, setFacebookUsers] = React.useState();

  const [USERS, {}] = useLazyQuery(GET_USERS, {
    variables: { email: user?.email },
    onCompleted: (data) => {
      const usersdata = data;
      setFacebookUsers(usersdata?.users);
    },
    onError: (e) => {
      console.log(e);
    },
    fetchPolicy: "network-only",
  });

  const [USER_EXIST_OR_NOT, { existdata, error, loading }] = useLazyQuery(
    GET_USER_EXIST,
    {
      variables: { email: user?.email },
      onCompleted: (data) => {
        const userdata = data;
        // console.log(userdata?.users?.length);
        if (userdata?.users?.length === 0) {
          setUserState(true);
        } else {
          USERS();
        }
      },
      onError: (e) => {
        console.log(e);
      },
      fetchPolicy: "network-only",
    }
  );
  React.useEffect(() => {
    if (user?.email) {
      USER_EXIST_OR_NOT();
    }
  }, [user]);
  // console.log(facebookUsers);

  return (
    <>
      <Navbar />
      {userState ? <NewUserPage currentuser={user} /> : null}
      {!userState ? (
        <UsersMapping
          facebookUsers={facebookUsers}
          currentUserEmail={user?.email}
        />
      ) : null}
    </>
  );
};

export default Home;
