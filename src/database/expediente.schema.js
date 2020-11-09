const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpedienteSchema = new Schema({
  source: {
    type: String,
    required: true,
  },
  pages: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
});

module.exports = ExpedienteSchema;
