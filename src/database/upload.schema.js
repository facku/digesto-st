const mongoose = require('mongoose');
const { Schema } = mongoose;

const UploadSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
});

module.exports = UploadSchema;
