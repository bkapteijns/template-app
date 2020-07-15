import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

ReactDOM.render(
  <Auth0Provider
    domain="dev-g9blhnj8.eu.auth0.com"
    clientId="PuxEFXXtq4RzYZkHbqzi16g1akqhRQBV"
    redirectUri="http://localhost:3000/profile"
    audience="http://localhost:3001"
    scope="read:current_user update:current_user_metadata"
  >
    <App secret={process.env.REACT_APP_AUTH0_DOMAIN} />
  </Auth0Provider>,
  document.getElementById("root")
);
