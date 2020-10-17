const mongoose = require("mongoose");

const { Schema } = mongoose;

const articleModel = new Schema({
  title: { type: String, required: true },
  authorId: { type: String, required: false },
  elements: { type: Array, required: true }
  /**
   * elements is an array of id's
   * the id's refer to either an image or a paragraph in the articles.files database
   * the articles.files contains the file type and the file itself
   * a 'file' is generated in either the state or the file system on the client side
   * that file is being served in the article
   * the extension makes sure the file is either an image or a piece of text
   */
});

module.exports = mongoose.model("Article", articleModel);
