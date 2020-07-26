require("dotenv").config();

const jwtAuthz = require("express-jwt-authz");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const domain = "dev-g9blhnj8.eu.auth0.com";

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer
  audience: `https://${domain}/api/v2/`,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"]
});

export const checkScope = jwtAuthz(["read:user", "update:user"]);

export const checkRole = (role) => (req, res, next) => {
  const assignedRoles = req.user["http://localhost:3000/roles"];
  return Array.isArray(assignedRoles) && assignedRoles.includes(role)
    ? next()
    : res.status(401).send("Insufficient role");
};
