const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
    image_url: { type: String },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient', require: true }]
})

module.exports = mongoose.model('Product', ProductSchema)