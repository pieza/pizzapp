const mongoose = require('mongoose')
const { Schema } = mongoose

const CartSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', require: true }]
})

module.exports = mongoose.model('Cart', CartSchema)