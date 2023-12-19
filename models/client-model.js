const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    username: {type: String},
    phone: {type: String},
    service: {type: String},
    connection: {type: String},
    text: {type: String},
    date: {type: Object({
        day: {type: String},
        time: {type: String}
    })},
    firstOpen: {type: Boolean, default: false}
})

module.exports = model('Client', ClientSchema)