const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const Article = require("./models/articleModel");
const Image = require("./models/imageModel");

// mongoose.Promise = global.Promise;

/** Connecting to the database */
export const connection = mongoose.createConnection(
  "mongodb://127.0.0.1:27017/template-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

export const db = mongoose.connect("mongodb://127.0.0.1:27017/template-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/** Bundling the mongoose schema's */
export const Schemas = { Article, Image };

/** Storing files */
const articleStorage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/template-app",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  /**
   * Currently only text/plain and images will be supported to make articles
   * Later I want to have support for full html pages including js and css
   * Only the html should be shown (of course)
   * The js and css should be imported in the html file
   *
   * The easiest way to do this (I think) is to create a temporary file system
   * on the client side, keeping track of the order the files are stored and
   * displaying text/plain, text/htm, text/html and image/+ in the right order
   */
  file: (req, file) => {
    if (file.mimetype.startsWith("image")) {
      return {
        filename: `${Date.now()}-user-${file.originalname}`,
        bucketName: "articles"
      };
    }
    if (
      ["text/plain", "text/htm", "text/html", "text/css", "text/js"].includes(
        file.mimetype
      )
    ) {
      return {
        filename: `${Date.now()}-user-${file.originalname}`,
        bucketName: "articles"
      };
    }
    return new Error("Filetype not supported");
  }
});

export const articleUpload = multer({ storage: articleStorage });

const storage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/template-app",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    if (file.mimetype.startsWith("image")) {
      return {
        filename: `${Date.now()}-user-${file.originalname}`,
        bucketName: "articles"
      };
    }
    return new Error("Filetype not supported");
  }
});

export const upload = multer({ storage });
