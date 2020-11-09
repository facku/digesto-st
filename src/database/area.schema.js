const mongoose = require('mongoose');
const { Schema } = mongoose;

const AreaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  agent: {
    role: {
      type: String,
    },
    name: {
      type: String,
    },
  },
});

module.exports = AreaSchema;
