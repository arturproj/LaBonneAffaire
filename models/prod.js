const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const prodSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String,
  avatar: String,
});

prodSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', prodSchema);

module.exports = User;
