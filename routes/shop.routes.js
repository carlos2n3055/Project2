const express = require('express')
const router = express.Router()
const Shop = require('./../models/shop-model')

// const localUpload = require('./../configs/local-upload.config')     // Para Cloudinary

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Not authorized, please log in' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' })



// ----- ENDPOINTS SHOPS -----


// Muestra la lista de las tiendas (GET)
router.get('/', (req, res, next) => {

  let isAdmin = req.user ? req.user.role.includes('ADMIN') : false
  
  let isAdminOwner
  
  if (req.user && (req.user.role.includes('ADMIN') || req.user.role.includes('OWNER'))) {
    isAdminOwner = true
  } else {
    isAdminOwner = false
  }

  Shop
      .find()
      .then(allShops => {
        res.render('shop/shop-index', { isAdmin, isAdminOwner, allShops })
      })
      .catch(err => next(new Error(err)))
})


// ----- NEW SHOP -----

// Muestra el formulario para crear una tienda (GET)
router.get('/new', (req, res) => res.render('shop/shop-new'))


// Guarda en la BBDD una tienda (POST)
router.post('/new', (req, res, next) => {

  const { name, shopImg, nationality, description, schedule, latitude, longitude } = req.body
  const owner = req.user.id

  const tempLatitude = latitude === "" ? 40.41880845178171: latitude
  const tempLongitude = longitude === "" ? -3.6965843056414744: longitude

  const location = {
    type: 'Point',
    coordinates: [tempLatitude, tempLongitude]
  }
 console.log(latitude)
  Shop
      .create({ name, shopImg, nationality, description, schedule, location, owner })
      .then(() => res.redirect('/shops'))
      .catch(err => next(new Error(err)))
})


// ----- DELETE SHOP -----

// Elimina de la BBDD la tienda (GET)
router.get('/delete', ensureAuthenticated, checkRole(['ADMIN']), (req, res, next) => {

    const shopId = req.query.id

    Shop
        .findByIdAndDelete(shopId)
        .then(() => res.redirect('/shops'))
        .catch(err => next(new Error(err)))
})


// ----- EDIT SHOP -----

// Muestra el formulario para editar una tienda (GET)
router.get('/edit', ensureAuthenticated, checkRole(['ADMIN']), (req, res, next) => {

  const shopId = req.query.id

    Shop
        .findById(shopId)
        .then(shopInfo => res.render('shop/shop-edit', shopInfo ))
        .catch(err => next(new Error(err)))
})


// Edita en la BBDD la tienda (POST)
router.post('/edit', (req, res, next) => {

    const shopId = req.query.id

    const { name, shopImg, nationality, description, schedule, latitude, longitude } = req.body

    const tempLatitude = latitude === "" ? 40.41880845178171: latitude
    const tempLongitude = longitude === "" ? -3.6965843056414744: longitude
  
    const location = {
      type: 'Point',
      coordinates: [tempLatitude, tempLongitude]
    }

    Shop
        .findByIdAndUpdate(shopId, { name, shopImg, nationality, description, schedule, location })
        .then(() => res.redirect('/shops'))
        .catch(err => next(new Error(err)))
})


// ----- SHOP DETAILS -----

// Muestra los detalles de una tienda (GET)
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
