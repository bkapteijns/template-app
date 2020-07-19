const express = require("express");

const PrivateController = require("../controllers/privateController");

function router() {
  const privateRouter = express.Router();
  const privateController = new PrivateController();

  privateRouter.route("/").get(privateController.get);

  return privateRouter;
}

module.exports = router;
