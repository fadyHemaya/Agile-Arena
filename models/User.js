const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = new Schema({

  email: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }

})

User.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

User.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

User.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

User.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};
module.exports = mongoose.model('Users', User)