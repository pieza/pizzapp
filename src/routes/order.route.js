const express = require('express')
const router = express.Router()

router.get('/orders', async (req, res) => {
    let filters = req.query ? req.query : {}

    let orders = await Order.find(filters)
    return res.status(200).json(orders)
})

router.get('/orders/:_id', async (req, res) => {
    const _id = req.params._id
    let order = await Order.findById(_id)

    return res.status(200).json(order)
})

router.post('/orders', async (req, res) => {
    let order = req.body
    let createdOrder = await Order.create(order)
    
    return res.status(200).json(createdOrder)
})

router.put('/orders/:_id', async (req, res) => {
    const _id = req.params._id
    let order = req.body
    let updatedOrder = await Order.updateOne({ _id }, order )
    
    return res.status(200).json(updatedOrder)
})

router.delete('/orders/:_id', async (req, res) => {
    const _id = req.params._id
    await Order.deleteOne({ _id })

    return res.status(200).json(true)
})


module.exports = router;