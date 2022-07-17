import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth0();
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  });
  return (
    <>
      <div
        onClick={() => {
          navigate("/home");
        }}
      >
        All People
      </div>
      <div
        onClick={() => {
          navigate("/friends");
        }}
      >
        Friends
      </div>
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
export default Navbar;
