const express = require("express");
const checkScope = require("express-jwt-authz");

const PrivateController = require("../controllers/privateController");

function router() {
  const privateRouter = express.Router();
  const privateController = new PrivateController();

  privateRouter.route("/").get(privateController.get);

  return privateRouter;
}

module.exports = router;
