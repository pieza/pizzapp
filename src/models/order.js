const mongoose = require('mongoose')
const { Schema } = mongoose

const OrderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', require: true }],
    promo_id: { type: Schema.Types.ObjectId, ref: 'Promo' },
    status: { type: String },
    date: { type: Date, default: Date.now },
    total_price: { type: Number, default: 0 }
})

module.exports = mongoose.model('Order', OrderSchema)