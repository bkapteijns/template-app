const mongoose = require("mongoose");

const { Schema } = mongoose;

const templateModel = new Schema({
  title: { type: String, required: true },
  authorId: { type: String, required: false },
  elements: { type: Array, required: true }, // array of p and i
  paragraphs: { type: Array, required: true }, // array of paragraph id's
  images: { type: Array, reequired: false } // array of image id's
});

module.exports = mongoose.model("Article", templateModel);
