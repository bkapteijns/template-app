const express = require("express");

const { Schemas, upload } = require("../mongo.config");
const AdminController = require("../controllers/adminController");

const { Article, Image, Paragraph } = Schemas;

function router() {
  const adminRouter = express.Router();
  const adminController = AdminController(Article, Image, Paragraph);

  adminRouter.route("/").get(adminController.get);

  adminRouter
    .route("/images")
    .post(upload.single("image"), adminController.postImage);

  adminRouter.route("/paragraphs").post(adminController.postParagraph);

  adminRouter.route("/articles").post(adminController.postArticle);

  return adminRouter;
}

module.exports = router;
