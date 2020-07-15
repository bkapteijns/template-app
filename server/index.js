const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const publicRouter = require("./routes/publicRoutes")();
const privateRouter = require("./routes/privateRoutes")();
const adminRouter = require("./routes/adminRoutes")();

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

const app = express();

function checkRole(role) {
  return (req, res, next) => {
    const assignedRoles = req.user["http://localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    }
    return res.status(401).send("Insufficient role");
  };
}

app.use("/public", publicRouter);

app.use("/private", checkJwt, privateRouter);

app.use("/admin", checkJwt, checkRole("admin"), adminRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my api");
});

app.listen(process.env.PORT || 3001);
