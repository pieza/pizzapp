const express = require('express')
const router = express.Router()
const { isAdmin, ensureAuthenticated } = require("../security/auth")

const Promo = require('../models/promo')
const CODE_LENGTH = 6

router.get('/promos', ensureAuthenticated, async (req, res) => {
    let filters = req.query ? req.query : {}

    let promos = await Promo.find(filters)
    return res.status(200).json(promos)
})

router.get('/promos/:_id', async (req, res) => {
    const _id = req.params._id
    let promo = await Promo.findById(_id)

    return res.status(200).json(promo)
})

router.post('/promos', isAdmin, async (req, res) => {
    let promo = req.body
    if(!promo.code) {
        let code
        do {
            code = generateRandomCode()
        } while(await Promo.find({ code }).length > 0)
        promo.code = code
    }
    let createdPromo = await Promo.create(promo)
    
    return res.status(200).json(createdPromo)
})

router.put('/promos/:_id', isAdmin, async (req, res) => {
    const _id = req.params._id
    let promo = req.body
    let updatedPromo = await Promo.updateOne({ _id }, promo)
    
    return res.status(200).json(updatedPromo)
})

router.delete('/promos/:_id', isAdmin, async (req, res) => {
    const _id = req.params._id
    await Promo.deleteOne({ _id })

    return res.status(200).json(true)
})

function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var result = ''
    var charactersLength = characters.length;
    for ( var i = 0; i < CODE_LENGTH; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

module.exports = router