const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tel: { type: Number, required: true },
    type: { type: String, required: true, default: 'CLIENT' }
})

module.exports = mongoose.model('User', UserSchema)