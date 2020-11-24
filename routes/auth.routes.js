const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../models/user-model")
const Shop = require('./../models/shop-model')
const bcrypt = require("bcrypt")
const bcryptSalt = 10


const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Not authorized, please log in' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' })



// ----- ENDPOINTS USER -----

// Profile OK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/profile', ensureAuthenticated, checkRole(['ADMIN', 'OWNER', 'GUEST']), (req, res) => res.render('user/profile', { user: req.user, isAdmin: req.user.role.includes('ADMIN') }))
    

// Favorites GET
router.get('/favorites', (req, res, next) => {
    
    User
        .findById(req.user._id)
        .populate('favorites')
        .then(theUser => {
            res.render('user/favorites', theUser)
        })
        .catch(err => next(new Error(err)))
})


 //Favorites POST
router.get('/favorites/:id', ensureAuthenticated, (req, res, next) => {
  
    const favorites = req.params.id
    
    User
        .findByIdAndUpdate(req.user._id, { $addToSet: { favorites } })
        .then(() => res.redirect('/shops'))
        .catch(err => next(new Error(err)))
})


// Favorites Delete
router.get('/favorite-del/:id', ensureAuthenticated, (req, res, next) => { 

    const favorites = req.params.id

    User
        .findByIdAndUpdate(req.user._id, { $pull: { favorites } })
        .then(() => res.redirect('/user-zone/favorites'))
        .catch(err => next(new Error(err)))
})


// -- SIGNUP --

// Añadir nuevo usuario (renderizar) (GET) OK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/signup', (req, res) => res.render('auth/signup', { user: req.user }))


// Añadir usuarios (gestión) (POST) OK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post('/signup', (req, res, next) => {

    const {
        username,
        password,
        profileImg,
        role
    } = req.body

    if (username === "" || password === "") {
        res.render('auth/signup', {errorMsg: "Please fill all fields"})
        return
    }

    User
        .findOne({
            username
        })
        .then(user => {
            if (user) {
                res.render("auth/signup", {errorMsg: "Please change the username. User exists"})
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({
                    username,
                    password: hashPass,
                    profileImg,
                    role
                })
                .then(() => res.redirect('/'))
                .catch(() => res.render("auth/signup", {errorMsg: "Error: User not created"}))
        })
        .catch(err => next(new Error(err)))
})


// --  LOGIN  --

// Inicio sesión (renderizado formulario) (GET) OK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get("/login", (req, res) => res.render("auth/login", {errorMsg: req.flash("error")}))

// Inicio sesión (gestión) (POST) OK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post("/login", passport.authenticate("local", {
    successRedirect: "/user-zone/profile",
    failureRedirect: "/user-zone/login",
    failureFlash: true,
    passReqToCallback: true
}))


// --  DELETE USERS  --

// Lista de usuarios para borrar o cambiar role (renderizar) (GET) OK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/delete', ensureAuthenticated, checkRole(['ADMIN']), (req, res, next) => {

  User
    .find()
    .then(allUsers => res.render('user/delete', {
      allUsers
    }))
    .catch(err => next(new Error(err)))
})

// Borrar usuarios (gestión) (POST) OK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post('/delete', (req, res, next) => {

    const userId = req.query.user_id

    User
        .findByIdAndDelete(userId)
        .then(() => res.redirect('/user-zone/delete'))
        .catch(err => next(new Error(err)))
})


// -- CHANGE ROLE -- POST
router.post('/change-role', (req, res) => {

    const userId = req.query.user_id

    // const role = req.body
    console.log(req.body)

    // User
    //     .findByIdAndUpdate(userId, { role })
    //     .then(() => res.redirect('/user-zone/change-role'))
    //     .catch(err => next(new Error(err)))
})


// --  EDIT PROFILE --

// Editar perfil (renderizar) (GET) OK!!!!!!!!!!!!!!!!!!!
router.get('/edit', ensureAuthenticated, checkRole(['ADMIN', 'OWNER', 'GUEST']), (req, res, next) => {

  const userId = req.user._id

    User
      .findById(userId)
      .then(userInfo => res.render('user/edit', { user: req.user, isAdmin: req.user.role.includes('ADMIN') }))
      .catch(err => next(new Error(err)))
})


// Editar perfil (gestión) (POST) OK!!!!!!!!!!!!!!!!!!!!!
router.post('/edit', (req, res, next) => {

    const userId = req.query.user_id
    
    User
        .findById(userId)
        .then(userInfo => {

            if (userInfo.role === "ADMIN") { // Con Role = ADMIN se permite modificar el Role del ADMIN
                const {
                    username,
                    password,
                    profileImg,
                    role
                } = req.body

                const salt = bcrypt.genSaltSync(bcryptSalt)
                const hashPass = bcrypt.hashSync(password, salt)

                User
                    .findByIdAndUpdate(userId, {
                        username,
                        password: hashPass,
                        profileImg,
                        role
                    })
                    .then(userInfo => res.redirect('/'))
                    .catch(err => next(new Error(err)))

            } else { // Cuando el Role no es igual a ADMIN no se permite modificar el Role

                const {
                    username,
                    password,
                    profileImg,
                } = req.body

                const salt = bcrypt.genSaltSync(bcryptSalt)
                const hashPass = bcrypt.hashSync(password, salt)

                User
                    .findByIdAndUpdate(userId, {
                        username,
                        password: hashPass,
                        profileImg,
                    })
                    .then(userInfo => res.redirect('/'))
                    .catch(err => next(new Error(err)))
            }
        })
})


// -- LOGOUT --  OK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/user-zone/login')
})


module.exports = router