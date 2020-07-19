const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const { checkJwt, checkScope, checkRole } = require("./authZero");

const publicRouter = require("./routes/publicRoutes")();
const privateRouter = require("./routes/privateRoutes")();
const scopedRouter = require("./routes/scopedRouter")();
const adminRouter = require("./routes/adminRoutes")();

const app = express();

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.use("/api/public", publicRouter);
app.use("/api/private", checkJwt, privateRouter);
app.use("/api/scoped", checkJwt, checkScope, scopedRouter);
app.use("/api/admin", checkJwt, checkRole("admin"), adminRouter);

app.get("/api", (req, res) => {
  res.send("Welcome to my api");
});

app.listen(process.env.PORT || 3001);
