import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <h1>Template</h1>
      <button type="button" onClick={() => loginWithRedirect()}>
        Log In
      </button>
      <button type="button" onClick={() => logout()}>
        Log Out
      </button>
    </>
  );
};

export default Home;
