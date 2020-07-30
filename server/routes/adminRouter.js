const express = require("express");
const { upload } = require("../mongo.config");

const AdminController = require("../controllers/adminController");

function router() {
  const adminRouter = express.Router();
  const adminController = AdminController();

  adminRouter.route("/").get(adminController.get);

  adminRouter
    .route("/articles")
    .post(upload.array("images"), adminController.postArticle);

  return adminRouter;
}

module.exports = router;
