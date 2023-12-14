const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    username: {type: String},
    phone: {type: String},
    service: {type: String},
    connection: {type: String},
    text: {type: String}
})

module.exports = model('Client', ClientSchema)