const express = require("express");

const { articleUpload, Schemas } = require("../mongo.config");
const AdminController = require("../controllers/adminController");

const { Article } = Schemas;

function router() {
  const adminRouter = express.Router();
  const adminController = AdminController(Article);

  adminRouter.route("/").get(adminController.get);

  adminRouter
    .route("/images")
    .post(articleUpload.single("image"), adminController.postElement);

  adminRouter
    .route("/paragraphs")
    .post(articleUpload.single("paragraph"), adminController.postElement);

  adminRouter
    .route("/articles")
    .get(adminController.getArticles)
    .post(adminController.postArticle);

  adminRouter.route("/article/:id").get(adminController.getArticleById);

  return adminRouter;
}

module.exports = router;
