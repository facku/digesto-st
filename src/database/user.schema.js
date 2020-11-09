const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
  },
});

module.exports = UserSchema;
