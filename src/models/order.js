const mongoose = require('mongoose')
const { Schema } = mongoose

const OrderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    products: [{
        product_id: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
        quantity: { type: Schema.Types.Number, default: 1 }
    }],
    promo_id: { type: Schema.Types.ObjectId, ref: 'Promo' },
    status: { type: String },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order', OrderSchema)