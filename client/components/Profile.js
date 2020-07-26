import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { get } from "axios";

const Profile = () => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    getAccessTokenSilently
  } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    console.log(user);
    const getUserMetadata = async () => {
      const domain = "dev-g9blhnj8.eu.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2`,
          scope: "read:current_user"
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await get(userDetailsByIdUrl, {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        });

        // eslint-disable-next-line
        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserMetadata();
  }, []);

  return isAuthenticated ? (
    <div>
      <img
        style={{ maxWidth: 200, maxHeight: 200 }}
        src={user.picture}
        alt={user.name}
      />
      <h3>{user.name}</h3>
      <h3>{user.email}</h3>
      {userMetadata ? (
        <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
      ) : (
        "No user metadata defined"
      )}
    </div>
  ) : (
    <div className="mt-3">
      <button
        className="btn btn-outline-primary ml-2"
        type="button"
        onClick={loginWithRedirect}
      >
        Log In
      </button>
    </div>
  );
};

export default Profile;
