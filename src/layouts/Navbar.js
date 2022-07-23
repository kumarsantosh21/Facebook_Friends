import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Facebookicon from "../assets/Facebookicon.svg";
import Button from "@mui/material/Button";
import ExpiredSession from "../components/ExpiredSession";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth0();
  const buttonStyle = {
    textTransform: "none",
    borderRadius: "8px",
    color: "black",
  };

  return (
    <>
      <div style={{ paddingBottom: "140px" }}>
        <div
          style={{
            position: "absolute",
            background: "white",
            boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
            height: "80px",
            borderRadius: "10px",
            width: "98%",
            marginLeft: "1%",
            marginTop: "2%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "20px",
              }}
            >
              <img src={Facebookicon} width={50} alt="Todo" style={{}} />
            </div>

            <Button
              onClick={() => {
                navigate("/home");
              }}
              variant="text"
              sx={{
                ...buttonStyle,
                fontWeight: window.location.pathname.includes("home")
                  ? "bold"
                  : "",
                marginLeft: "15px",
              }}
            >
              All People
            </Button>
            <Button
              onClick={() => {
                navigate("/friends");
              }}
              variant="text"
              sx={{
                ...buttonStyle,
                fontWeight: window.location.pathname.includes("friends")
                  ? "bold"
                  : "",
                marginLeft: "15px",
              }}
            >
              Friends
            </Button>
          </div>
          <Button
            onClick={() => {
              logout({
                returnTo: window.location.origin,
              });
            }}
            variant="text"
            sx={{
              ...buttonStyle,
              marginRight: "20px",
              "&:hover": { fontWeight: "bold" },
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      {!isAuthenticated ? (
        <ExpiredSession
          dialogstate={true}
          handleClose={() => {
            logout({
              returnTo: window.location.origin,
            });
          }}
          handleConfirmActionClick={() => {
            logout({
              returnTo: window.location.origin,
            });
          }}
        />
      ) : null}
    </>
  );
};
export default Navbar;
