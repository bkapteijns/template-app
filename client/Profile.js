import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetaData, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `http://localhost:3001`,
          scope: "read:current_user"
        });

        const userDetailsByIdUrl = `http://localhost:3001/api/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        // eslint-disable-next-line
        const { user_metadata } = await metadataResponse.json();
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, []);

  return (
    isAuthenticated && (
      <div>
        <img style={{ maxHeight: 100 }} src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h2>User Metadata</h2>
        {userMetaData ? (
          <pre>{JSON.stringify(userMetaData, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};

export default Profile;
