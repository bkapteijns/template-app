import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.render(
  <Auth0Provider
    domain="dev-g9blhnj8.eu.auth0.com"
    clientId="PuxEFXXtq4RzYZkHbqzi16g1akqhRQBV"
    redirectUri="http://localhost:3000/profile"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
