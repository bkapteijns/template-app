const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const { connection } = require("../mongo.config");

let gfs;
connection.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "fs"
  });
});

function scopedController(Image) {
  const getImages = (req, res) => {
    const ownerId = req.user.sub.split("|")[1];
    Image.find({ ownerId }, (err, images) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json(images);
    });
    /*
    Image.find((err, images) => {
      if (err) return res.status(400).send(err);
      return res.json(images);
    });
    */
  };

  const postImages = (req, res) => {
    const image = new Image({
      ...req.body,
      filesId: req.file.id,
      ownerId: req.user.sub.split("|")[1]
    });
    image.save();

    res.status(201).json(image);
  };

  const getImageById = (req, res) => {
    const id = ObjectId(req.params.id);
    gfs.openDownloadStream(id).pipe(res);
  };

  return { getImages, postImages, getImageById };
}

module.exports = scopedController;
