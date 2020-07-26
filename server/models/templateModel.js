const mongoose = require("mongoose");

const { Schema } = mongoose;

const templateModel = new Schema({
  name: { type: String, required: false },
  files_id: { type: String, required: true }
});

module.exports = mongoose.model("Template", templateModel);
