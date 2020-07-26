const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const { connection } = require("../mongo.config");

let gfs;
connection.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "fs"
  });
});

export default function publicController(Template) {
  const get = (req, res) => {
    // res.send("Welcome to my public api");

    Template.find((err, templates) => {
      if (err) return res.send(err);
      return res.send(templates);
    });
  };

  const post = (req, res) => {
    const template = new Template({ ...req.body, files_id: req.file.id });

    template.save();

    return res.status(201).json(template);
  };

  const getById = (req, res) => {
    const id = ObjectId(req.params.id);
    gfs.openDownloadStream(id).pipe(res);
  };

  return { get, post, getById };
}

module.exports = publicController;
