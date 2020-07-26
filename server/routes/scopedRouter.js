const express = require("express");

const { Schemas, upload } = require("../mongo.config");
const ScopedController = require("../controllers/scopedController");

const { Image } = Schemas;

function router() {
  const scopedRouter = express.Router();
  const scopedController = new ScopedController(Image);

  scopedRouter.route("/").get(scopedController.get);

  scopedRouter.route("/images").get(scopedRouter.getImages);

  return scopedRouter;
}

module.exports = router;
