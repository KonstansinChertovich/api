const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true}
})

module.exports = model('User', UserSchema)