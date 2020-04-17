const express = require('express')
const router = express.Router()

const Ingredient = require('../models/ingredient')

const { ensureAuthenticated, isAdmin } = require('../security/auth')
const { uploadImage, deleteImage } = require('../utils/image.utils') 
const { validate } = require('../utils/validators')

router.get('/ingredients', async (req, res, next) => {
    try {
        let filters = req.query ? req.query : {}

        let ingredients = await Ingredient.find(filters)
        return res.status(200).json(ingredients)
    } catch (error) {
        next(error)
    }
})

router.get('/ingredients/:_id', async (req, res) => {
    try {
        const _id = req.params._id
        let ingredient = await Ingredient.findById(_id)

        return res.status(200).json(ingredient)
    } catch (error) {
        next(error)
    }
})

router.post('/ingredients', isAdmin, async (req, res, next) => {
    try {
        let ingredient = req.body
        
        validate('ingredient', req.body);

        if(req.file) {
            const imageUrl = await uploadImage(req.file)
            ingredient.image_url = imageUrl
        } 

        let createdIngredient = await Ingredient.create(ingredient)
        
        return res.status(200).json(createdIngredient)
    } catch (error) {
        next(error)
    }
    
})

router.put('/ingredients/:_id', isAdmin, async (req, res, next) => {
    try {
        const _id = req.params._id
        let ingredient = req.body

        if(req.file) {
            await deleteImage(ingredient.image_url)
            const imageUrl = await uploadImage(req.file)
            ingredient.image_url = imageUrl
        } 

        await Ingredient.updateOne({ _id }, ingredient )
        let updatedIngredient = await Ingredient.findById(_id)
        
        return res.status(200).json(updatedIngredient)
    } catch (error) {
        next(error)
    }  
})

router.delete('/ingredients/:_id', isAdmin, async (req, res, next) => {
    try {
        const _id = req.params._id
        const ingredient = await Ingredient.findById(_id)

        await deleteImage(ingredient.image_url)
        await Ingredient.deleteOne({ _id })

        return res.status(200).json(true)
        
    } catch (error) {
        next(error)
    }
})


module.exports = router;