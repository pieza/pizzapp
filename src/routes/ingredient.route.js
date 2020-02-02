const express = require('express')
const router = express.Router()

const Ingredient = require('../models/ingredient')

router.get('/ingredients', async (req, res) => {
    let filters = req.query ? req.query : {}

    let ingredients = await Ingredient.find(filters)
    return res.status(200).json(ingredients)
})

router.get('/ingredients/:_id', async (req, res) => {
    const _id = req.params._id
    let ingredient = await Ingredient.findById(_id)

    return res.status(200).json(ingredient)
})

router.post('/ingredients', async (req, res) => {
    let ingredient = req.body
    let createdIngredient = await Ingredient.create(ingredient)
    
    return res.status(200).json(createdIngredient)
})

router.put('/ingredients/:_id', async (req, res) => {
    const _id = req.params._id
    let ingredient = req.body
    let updatedIngredient = await Ingredient.updateOne({ _id }, ingredient )
    
    return res.status(200).json(updatedIngredient)
})

router.delete('/ingredients/:_id', async (req, res) => {
    const _id = req.params._id
    await Ingredient.deleteOne({ _id })

    return res.status(200).json(true)
})


module.exports = router;