const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require("../security/auth")

const Cart = require('../models/cart')

router.get('/carts', ensureAuthenticated, async (req, res) => {
    let filters = req.query ? req.query : {}

    let carts = await Cart.find(filters).populate({
        path: 'products',
        populate: {
            path: 'ingredients'
        }
    })
    return res.status(200).json(carts)
})

router.get('/carts/:_id', ensureAuthenticated, async (req, res) => {
    const _id = req.params._id
    let cart = await Cart.findById(_id).populate({
        path: 'products',
        populate: {
            path: 'ingredients'
        }
    })

    return res.status(200).json(cart)
})

router.post('/carts', ensureAuthenticated, async (req, res) => {
    let cart = req.body
    let createdCart = await Cart.create(cart)
    
    return res.status(200).json(createdCart)
})

router.put('/carts/:_id', ensureAuthenticated, async (req, res) => {
    const _id = req.params._id
    let cart = req.body
    let updatedCart = await Cart.updateOne({ _id }, cart)
    
    return res.status(200).json(updatedCart)
})

router.delete('/carts/:_id', ensureAuthenticated, async (req, res) => {
    const _id = req.params._id
    await Cart.deleteOne({ _id })

    return res.status(200).json(true)
})

module.exports = router;