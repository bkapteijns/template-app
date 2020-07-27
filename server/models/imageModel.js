const mongoose = require("mongoose");

const { Schema } = mongoose;

const imageModel = new Schema({
  ownerId: { type: String, required: true },
  name: { type: String, required: false },
  filesId: { type: String, required: true }
});

module.exports = mongoose.model("Image", imageModel);
