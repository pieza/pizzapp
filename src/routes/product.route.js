const express = require('express')
const router = express.Router()

const { uploadImage } = require('../utils/image.utils') 

const Product = require('../models/product')

router.get('/products', async (req, res) => {
    let filters = req.query ? req.query : {}

    let products = await Product.find(filters)
    return res.status(200).json(products)
})

router.get('/products/:_id', async (req, res) => {
    const _id = req.params._id
    let product = await Product.findById(_id)

    return res.status(200).json(product)
})

router.post('/products', async (req, res) => {
    let product = req.body

    if(req.file) {
        const imageUrl = await uploadImage(req.file)
        product.image_url = imageUrl
        product.ingredients = JSON.parse(req.body.ingredients)
    } 

    let createdProduct = await Product.create(product)
    
    return res.status(200).json(createdProduct)
})

router.put('/products/:_id', async (req, res) => {
    const _id = req.params._id
    let product = req.body

    if(req.file) {
        await deleteImage(product.image_url)
        const imageUrl = await uploadImage(req.file)
        product.image_url = imageUrl
    } 
    
    let updatedProduct = await Product.updateOne({ _id }, product )
    
    return res.status(200).json(updatedProduct)
})

router.delete('/products/:_id', async (req, res) => {
    const _id = req.params._id
    const product = await Product.findById(_id)

    await deleteImage(product.image_url)
    await Product.deleteOne({ _id })

    return res.status(200).json(true)
})


module.exports = router;