const mongoose = require('mongoose')
const { Schema } = mongoose

const IngredientSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    image_url: { type: String },
    price: { type: Number, required: true },
    zindex: { type: Number, required: true }
})

module.exports = mongoose.model('Ingredient', IngredientSchema)