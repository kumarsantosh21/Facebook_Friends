import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { isLoading, error, user, isAuthenticated, loginWithRedirect, logout } =
    useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading... </div>;
  }

  document.title = "Dashboard";
  console.log(user, window.location.pathname);
  return (
    <>
      {isAuthenticated ? (
        <>
          <div>Dashboard</div>
          <div
            onClick={() => {
              navigate("/linkredirect");
            }}
          >
            link
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
      ) : (
        <div onClick={() => loginWithRedirect()}>Login to work</div>
      )}
    </>
  );
}

export default App;
