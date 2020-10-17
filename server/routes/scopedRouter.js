const express = require("express");

const { Schemas, upload } = require("../mongo.config");
const ScopedController = require("../controllers/scopedController");

const { Image } = Schemas;

function router() {
  const scopedRouter = express.Router();
  const scopedController = ScopedController(Image);

  scopedRouter
    .route("/")
    .get((req, res) => res.send("Welcome to my scoped api!"));

  /* 'image' in upload.single means get it from req.body.image */
  scopedRouter
    .route("/images")
    .get(scopedController.getImages)
    .post(upload.single("image"), scopedController.postImage);

  scopedRouter.route("/image/:id").get(scopedController.getImageById);

  return scopedRouter;
}

module.exports = router;
