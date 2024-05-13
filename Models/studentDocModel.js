const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentDocSchema = new Schema({
  tname: {
    type: String,
    required: true,
  },
  sports: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const studentDocuments = mongoose.model("studentDocuments", studentDocSchema);

module.exports = studentDocuments;
