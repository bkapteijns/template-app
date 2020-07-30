const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const Article = require("./models/articleModel");
const Image = require("./models/imageModel");
const Paragraph = require("./models/paragraphModel");

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
export const Schemas = { Article, Image, Paragraph };

/** Storing files */
const storage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/template-app",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      return new Error("File must be of type png or jpeg");
    }

    return {
      filename: `${Date.now()}-user-${file.originalname}`,
      bucketName: "fs"
    };
  }
});

export const upload = multer({ storage });
