const mongoose = require('mongoose')
const { Schema } = mongoose

const IngredientSchema = new Schema({
    name: { type: String },
    description: { type: String },
    image_url: { type: String },
    price: { type: Number },
    zindex: { type: Number }
})

module.exports = mongoose.model('Ingredient', IngredientSchema)