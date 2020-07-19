const express = require("express");

const ScopedController = require("../controllers/scopedController");

function router() {
  const scopedRouter = express.Router();
  const scopedController = new ScopedController();

  scopedRouter.route("/").get(scopedController.get);

  return scopedRouter;
}

module.exports = router;
