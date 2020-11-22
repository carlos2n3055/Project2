const express = require('express')
const router = express.Router()

const Shop = require('./../models/shop-model')

// Endpoints
router.get('/shops', (req, res, next) => {

    Shop
        .find()
        .then(allShops => res.json(allShops))
        .catch(err => next(new Error(err)))
})

module.exports = router