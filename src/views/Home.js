import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_USER_EXIST, GET_USERS, INSERT_NEW_USER } from "../graphql";
import UsersMapping from "../components/UsersMapping";
import checkundefinednull from "../utils/checkundefinednull";

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth0();
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  });
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
  const [INSETING_USER, {}] = useMutation(INSERT_NEW_USER, {
    variables: {
      email: user?.email,
      nickname: user?.nickname,
      userimg: user?.picture,
    },
    onCompleted: () => {
      USERS();
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
          INSETING_USER();
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
  }, []);
  // console.log(facebookUsers);

  return (
    <>
      <div>Home</div>
      <UsersMapping
        facebookUsers={facebookUsers}
        currentUserEmail={user?.email}
      />
      <div
        onClick={() => {
          logout({
            returnTo: window.location.origin,
          });
        }}
      >
        Logout
      </div>
    </>
  );
};

export default Home;
