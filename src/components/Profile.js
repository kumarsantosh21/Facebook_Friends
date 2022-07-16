import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { isLoading, error, user, isAuthenticated, loginWithRedirect, logout } =
    useAuth0();
  return (
    <>
      <div>{user.email}</div>
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

export default Profile;
