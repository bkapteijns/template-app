const express = require("express");

const PublicController = require("../controllers/publicController");

function router() {
  const publicRouter = express.Router();
  const publicController = PublicController();

  publicRouter.route("/").get(publicController.get);

  return publicRouter;
}

module.exports = router;
