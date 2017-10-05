var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    phone: String,
    password: String
});

var user = mongoose.model('users', userSchema);

module.exports = user;