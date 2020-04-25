const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const Promo = require('../models/promo')
const { ensureAuthenticated } = require("../security/auth")

const getProductPrice = product => {
    return product.ingredients.reduce((a, b) => a + b.price, 0)
}

router.get('/orders', async (req, res, next) => {
    try {
        let filters = req.query ? req.query : {}

        let orders = await Order.find(filters).populate({ path: 'products', populate: {
            path: 'ingredients'
        }}).populate('promo_id').populate('user_id')

        for (let i = 0; i < orders.length; i++) {
            const order = orders[i]
            let price = order.products.reduce((a, b) => a + getProductPrice(b), 0)
            if(order.promo_id) {
                price = price - (price * order.promo_id.percent)
            }
            console.log(price)
            order.total_price = price
            orders[i] = order
        }
        return res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
})

router.get('/orders/:_id', async (req, res, next) => {
    try {
        const _id = req.params._id
        let order = await Order.findById(_id).populate({ path: 'products', populate: {
            path: 'ingredients'
        }}).populate('promo_id').populate('user_id')

        let price = order.products.reduce((a, b) => a + getProductPrice(b), 0)
        if(order.promo_id) {
            price = price - (price * order.promo_id.percent)
        }
        order.total_price = price

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