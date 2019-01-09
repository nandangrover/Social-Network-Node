const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
// const jwt = require('jsonwebtoken');
// const secret = require('../config/secret').secret;


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);