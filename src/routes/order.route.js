const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const Promo = require('../models/promo')
const { ensureAuthenticated } = require("../security/auth")

router.get('/orders', async (req, res, next) => {
    try {
        let filters = req.query ? req.query : {}

        let orders = await Order.find(filters)
        return res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
})

router.get('/orders/:_id', async (req, res, next) => {
    try {
        const _id = req.params._id
        let order = await Order.findById(_id)

        return res.status(200).json(order)
    } catch (error) {
        next(error)
    }
})

router.post('/orders', ensureAuthenticated, async (req, res, next) => {
    try {
        let order = req.body
        
        if(order.promo_id) {
            await Promo.updateOne({ _id: order.promo_id}, { active: false })
        }

        order.status = 'pending'

        
        let createdOrder = await Order.create(order)
        
        return res.status(200).json(createdOrder)
    } catch (error) {
        next(error)
    }
})

router.put('/orders/:_id', async (req, res, next) => {
    try {
        const _id = req.params._id
        let order = req.body
        let updatedOrder = await Order.updateOne({ _id }, order )
        
        return res.status(200).json(updatedOrder)
    } catch (error) {
        next(error)
    }
})

router.delete('/orders/:_id', async (req, res, next) => {
    try {
        const _id = req.params._id
        await Order.deleteOne({ _id })

        return res.status(200).json(true)
    } catch (error) {
        next(error)
    }
})


module.exports = router;