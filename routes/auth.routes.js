const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../models/user-model")
const Shop = require('./../models/shop-model')
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const CDNUpload = require('./../configs/cdn-upload.config')  // Cloudinary

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Not authorized, please log in' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' })



// ----- ENDPOINTS USER -----


// Ver página del perfil del usuario (GET)
router.get('/profile', ensureAuthenticated, checkRole(['ADMIN', 'OWNER', 'GUEST']), (req, res) => res.render('user/profile', { user: req.user, isAdmin: req.user.role.includes('ADMIN'), isOwner: req.user.role.includes('OWNER') }))
   


// ----- FAVORITES -----

// Ver favoritos (GET)
router.get('/favorites', (req, res, next) => {
    
    User
        .findById(req.user._id)
        .populate('favorites')
        .then(theUser => {res.render('user/favorites', theUser)})
        .catch(err => next(new Error(err)))
})


 // Añadir shop a favoritos del usuario (GET)
router.get('/favorites/:id', ensureAuthenticated, (req, res, next) => {
  
    const favorites = req.params.id
    
    User
        .findByIdAndUpdate(req.user._id, { $addToSet: { favorites } })
        .then(() => res.redirect('/shops'))
        .catch(err => next(new Error(err)))
})


// Borrar shop de favoritos del usuario (GET)
router.get('/favorite-del/:id', ensureAuthenticated, (req, res, next) => { 

    const favorites = req.params.id

    User
        .findByIdAndUpdate(req.user._id, { $pull: { favorites } })
        .then(() => res.redirect('/user-zone/favorites'))
        .catch(err => next(new Error(err)))
})



// ----- SHOP'S OWNER -----

// Muestra el listado de las tiendas del Owner (GET)
router.get('/my-shops', ensureAuthenticated, checkRole(['OWNER']), (req, res, next) => { 

    const userId = req.user._id

    Shop
        .find({ owner: userId })
        .then(ownerShops => {res.render('user/owner-shops', { ownerShops })})
        .catch(err => next(new Error(err)))
})


// Muestra el formulario para editar una tienda del Owner (POST)
router.post('/edit-shop-owner', ensureAuthenticated, checkRole(['OWNER']), (req, res, next) => {

  const shopId = req.query.shop_id

    Shop
        .findById(shopId, { name:"", shopImg:"", nationality:"", description:"", schedule:"", location:"" })
        .then(shopInfo => res.render('shop/shop-edit', shopInfo ))
        .catch(err => next(new Error(err)))
})


// Elimina de la BBDD la tienda del Owner (POST)
router.post('/del-shop-owner', ensureAuthenticated, checkRole(['OWNER']), (req, res, next) => {

    const shopId = req.query.shop_id

    Shop
        .findByIdAndDelete(shopId)
        .then(() => res.redirect('/user-zone/my-shops'))
        .catch(err => next(new Error(err)))
})



// ----- SIGNUP -----

// Muestra el formulario para añadir nuevo usuario (GET)
router.get('/signup', (req, res) => res.render('auth/signup', { user: req.user }))


// Añadir usuarios en la BBDD (POST)
router.post('/signup', (req, res, next) => {

    const { username, password } = req.body

    if (username === "" || password === "") {
        res.render('auth/signup', {errorMsg: "Please fill all fields"})
        return
    }

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render('auth/signup', {errorMsg: "Please change the username. User exists"})
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(() => res.render('auth/signup', {errorMsg: "Error: User not created"}))
        })
        .catch(err => next(new Error(err)))
})



// -----  LOGIN  -----

// Muestra el formulario de Inicio de Sesión (GET)
router.get('/login', (req, res) => res.render('auth/login', {errorMsg: req.flash("error")}))


// Inicio sesión (gestión) (POST)
router.post('/login', passport.authenticate("local", {
    successRedirect: '/user-zone/profile',
    failureRedirect: '/user-zone/login',
    failureFlash: true,
    passReqToCallback: true
}))



// -----  DELETE USERS AND CHANGE ROLE -----

// Muestra la lista de usuarios para borrar o cambiar role (GET)
router.get('/delete', ensureAuthenticated, checkRole(['ADMIN']), (req, res, next) => {

  User
    .find({}, { username:"", role:"" })
    .then(allUsers => res.render('user/delete', { allUsers }))
    .catch(err => next(new Error(err)))
})


// Borrar usuarios (gestión) (POST)
router.post('/delete', (req, res, next) => {

    const userId = req.query.user_id

    User
        .findByIdAndDelete(userId)
        .then(() => res.redirect('/user-zone/delete'))
        .catch(err => next(new Error(err)))
})


// Cambia el role de los usuarios (POST)
router.post('/change-role', (req, res, next) => {

    const userId = req.query.user_id

    const { role } = req.body

    User
        .findByIdAndUpdate(userId, { role })
        .then(() => res.redirect('/user-zone/delete'))
        .catch(err => next(new Error(err)))
})



// -----  EDIT USER PROFILE -----

// Muestra el formulario con los datos del usuario (GET)
router.get('/edit', ensureAuthenticated, checkRole(['ADMIN', 'OWNER', 'GUEST']), (req, res, next) => {

  const userId = req.user._id

    User
        .findById(userId, { username:"", password:"", profileImg:"" })
        .then(userInfo => res.render('user/edit', { user: req.user, isAdmin: req.user.role.includes('ADMIN') }))
        .catch(err => next(new Error(err)))
})


// Edita en la BBDD los datos del usuario (POST)
router.post('/edit', CDNUpload.single("imageFile"), (req, res, next) => {

    const userId = req.query.user_id
    
    const { username, password } = req.body

    if (username === "") {
        res.render('user/edit', {errorMsg: "Please fill username"})
        return

    } else if (password === "") {
        res.render('user/edit', {errorMsg: "Please fill password"})
        return

    } else if (req.file === undefined) {

        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password, salt)

        User
            .findByIdAndUpdate(userId, { username, password: hashPass })
            .then(userInfo => res.redirect('/user-zone/profile'))
            .catch(err => next(new Error(err)))
        
        return

    } else {

        const imgFile = req.file.path

        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password, salt)

        User
            .findByIdAndUpdate(userId, { username, password: hashPass, profileImg: imgFile, })
            .then(userInfo => res.redirect('/user-zone/profile'))
            .catch(err => next(new Error(err)))
    }
})



// ----- LOGOUT -----
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/user-zone/login')
})


module.exports = router
