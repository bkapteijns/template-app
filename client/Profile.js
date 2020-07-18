import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return isAuthenticated ? (
    <div>Profile</div>
  ) : (
    <button type="button" onClick={loginWithRedirect}>
      Log In
    </button>
  );
};

export default Profile;
