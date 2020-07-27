const express = require("express");

const AdminController = require("../controllers/adminController");

function router() {
  const adminRouter = express.Router();
  const adminController = AdminController();

  adminRouter.route("/").get(adminController.get);

  return adminRouter;
}

module.exports = router;
