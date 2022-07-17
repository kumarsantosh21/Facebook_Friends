import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Home from "./views/Home";

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
    return <div>Loading... </div>;
  }

  // console.log(user, window.location.pathname);
  return (
    <>
      <div onClick={() => loginWithRedirect()}>Login to work</div>
      <div
        onClick={() => {
          throw new Error("working or not");
        }}
      >
        Sentry Check
      </div>
    </>
  );
}

export default App;
