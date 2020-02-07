const express = require('express')
const router = express.Router()

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
    let createdProduct = await Product.create(product)
    
    return res.status(200).json(createdProduct)
})

router.put('/products/:_id', async (req, res) => {
    const _id = req.params._id
    let product = req.body
    let updatedProduct = await Product.updateOne({ _id }, product )
    
    return res.status(200).json(updatedProduct)
})

router.delete('/products/:_id', async (req, res) => {
    const _id = req.params._id
    await Product.deleteOne({ _id })

    return res.status(200).json(true)
})


module.exports = router;