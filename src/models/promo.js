const mongoose = require('mongoose')
const { Schema } = mongoose

const PromoSchema = new Schema({
    name: { type: String },
    description: { type: String },
    code: { type: String, unique: true },
    percent: { type: Number },
    active: { type: Boolean }
})

module.exports = mongoose.model('Promo', PromoSchema)