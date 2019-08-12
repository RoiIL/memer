const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String
  }
});
  
var User = mongoose.model('User', UserSchema);
module.exports = User;