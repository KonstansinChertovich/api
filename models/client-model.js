const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    username: {type: String, unique: true, require: true},
    phone: {type: String, unique: true, require: true},
    service: {type: String, require: true},
    connection: {type: String, require: true},
    text: {type: String}
})

module.exports = model('Client', ClientSchema)