const mongoose = require("mongoose");

const { Schema } = mongoose;

const paragraphModel = new Schema({
  text: { type: String, required: true }
});

module.exports = mongoose.model("Paragraph", paragraphModel);
