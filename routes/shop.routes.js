const express = require('express')
const router = express.Router()

const Shop = require('./../models/shop-model')



// ----- ENDPOINTS SHOPS -----


// Muestra la lista de las tiendas (GET)
router.get('/', (req, res, next) => {

  Shop
      .find()
      .then(allShops => {
        res.render('shop/shop-index', { allShops })
      })
      .catch(err => next(new Error(err)))
})


// Muestra el formulario para crear una tienda (GET)
router.get('/new', (req, res) => res.render('shop/shop-new'))


// Guarda en la BBDD una tienda (POST)
router.post('/new', (req, res, next) => {

  const { name, shopImg, nationality, description, schedule, latitude, longitude } = req.body

  const location = {
    type: 'Point',
    coordinates: [latitude, longitude]
  }

  Shop
      .create({ name, shopImg, nationality, description, schedule, location })
      .then(() => res.redirect('/shops'))
      .catch(err => next(new Error(err)))
})


// Elimina de la BBDD la tienda --
router.get('/delete', (req, res) => {

    const shopId = req.query.id

    Shop
        .findByIdAndDelete(shopId)
        .then(() => res.redirect('/shops'))
        .catch(err => next(new Error(err)))
})


// Muestra el formulario para editar una tienda (render)
router.get('/edit', (req, res, next) => {

    const shopId = req.query.id
    
    Shop
        .findById(shopId)
        .then(shopInfo => res.render('shop/shop-edit', shopInfo))
        .catch(err => next(new Error(err)))
})


// Edita en la BBDD la tienda (gestión)
router.post('/edit', (req, res, next) => {

    const shopId = req.query.id

    const { name, shopImg, nationality, description, schedule, latitude, longitude } = req.body

    const location = {
      type: 'Point',
      coordinates: [latitude, longitude]
    }

    Shop
        .findByIdAndUpdate(shopId, { name, shopImg, nationality, description, schedule, location })
        .then(() => res.redirect('/shops'))
        .catch(err => next(new Error(err)))
})


// Muestra los detalles de una tienda --
router.get('/:shop_id', (req, res, next) => {

    const shopId = req.params.shop_id

    Shop
        .findById(shopId)
        .then(theShop => {
            res.render('shop/shop-details', theShop)
        })
        .catch(err => next(new Error(err)))
})



module.exports = router