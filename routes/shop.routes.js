const express = require('express')
const router = express.Router()
const passport = require("passport")
const { findById } = require('../models/user-model')
const User = require("../models/user-model")
const Shop = require('./../models/shop-model')

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Not authorized, please log in' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' })



// ----- ENDPOINTS SHOPS -----


// Muestra la lista de las tiendas (GET)
router.get('/', (req, res, next) => {

  let isAdminOwner
  
  if (req.user && (req.user.role.includes('ADMIN') || req.user.role.includes('OWNER'))) {
    isAdminOwner = true
  } else {
    isAdminOwner = false
  }

  Shop
      .find()
      .then(allShops => {
        res.render('shop/shop-index', { isAdminOwner, allShops })
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


// Elimina de la BBDD la tienda
router.get('/delete', ensureAuthenticated, checkRole(['ADMIN', 'OWNER']), (req, res, next) => {

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
        .then(shopInfo => res.render('shop/shop-edit', { user: req.user, isAdmin: req.user.role.includes('ADMIN') }, shopInfo))
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
  let isAdmin = req.user ? req.user.role.includes('ADMIN'): false

  Shop
      .findById(shopId)
      .then(theShop => {
      res.render('shop/shop-details', { isAdmin, theShop } )
        })
      .catch(err => next(new Error(err)))
})



module.exports = router