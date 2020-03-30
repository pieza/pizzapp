const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    image_url: { type: String },
    price: { type: Number, default: 0, required: true },
    ingredients: [{
        ingredient_id: { type: Schema.Types.ObjectId, ref: 'Ingredient', require: true }
    }]
})

module.exports = mongoose.model('Product', ProductSchema)