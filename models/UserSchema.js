const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const User = new Schema({
    login: {type: String, require: true, unique:true},
    firstname: String,
    lastname: String,
    mail: {type: String, require: true, unique:true},
    password:String
}, {collection: 'users'})

module.exports = mongoose.model("users", User, "users");