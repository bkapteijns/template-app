const express = require("express");

const { Schemas, upload } = require("../mongo.config");
const PublicController = require("../controllers/publicController");

const { Template } = Schemas;

function router() {
  const publicRouter = express.Router();
  const publicController = new PublicController(Template);

  publicRouter
    .route("/")
    .get((req, res) => res.send("Welcome to my public api!"));

  publicRouter
    .route("/images")
    .get(publicController.get)
    .post(upload.single("image"), publicController.post);

  publicRouter.route("/image/:id").get(publicController.getById);

  publicRouter
    .route("/test")
    .get((req, res) => {
      Template.find((err, template) => {
        if (err) return res.send(err);
        return res.json(template);
      });
    })
    .post((req, res) => {
      const template = new Template({
        name: req.body.name,
        files_id: req.body.files_id
      });
      template.save();
      return res.send(template);
    });

  return publicRouter;
}

module.exports = router;
