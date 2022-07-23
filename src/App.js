import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Facebookicon from "./assets/Facebookicon.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Loading from "./assets/Loading";

function App() {
  const navigate = useNavigate();

  const { isLoading, error, user, isAuthenticated, loginWithRedirect, logout } =
    useAuth0();
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  });

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  // console.log(user, window.location.pathname);
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
            <Typography sx={{ marginLeft: "30px", fontWeight: "bold" }}>
              Connect friends accross world
            </Typography>
          </div>
          <Button
            onClick={() => loginWithRedirect()}
            variant="text"
            sx={{
              ...buttonStyle,
              marginRight: "20px",
              "&:hover": { fontWeight: "bold" },
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
