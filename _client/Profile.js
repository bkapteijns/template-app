import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router";

const Profile = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <div>Profile</div> : null;
};

export default Profile;
