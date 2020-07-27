const express = require("express");
require("dotenv").config();
const bodyparser = require("body-parser");
const cors = require("cors");

const { checkJwt, checkScope, checkRole } = require("./authZero");

const publicRouter = require("./routes/publicRouter")();
const privateRouter = require("./routes/privateRouter")();
const scopedRouter = require("./routes/scopedRouter")();
const adminRouter = require("./routes/adminRouter")();

const app = express();

app.use(cors(), bodyparser.urlencoded({ extended: true }), bodyparser.json());

app.use("/api/public", publicRouter);
app.use("/api/private", checkJwt, privateRouter);
app.use("/api/scoped", checkJwt, checkScope, scopedRouter);
app.use("/api/admin", checkJwt, checkRole("admin"), adminRouter);

app.get("/api", (req, res) => {
  res.send("Welcome to my api");
});

app.listen(
  process.env.PORT || 3001,
  console.log("Server running on port 3001") // eslint-disable-line
);
