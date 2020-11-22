const express = require('express')
const router = express.Router()
const User = require("../models/user-model")

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Not authorized, please log in' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' })


// Endpoints
router.get('/', (req, res) => res.render('index'))

// router.get('/user/profile', ensureAuthenticated, checkRole(['ADMIN', 'OWNER', 'GUEST']), (req, res) => res.render('profile', { user: req.user, isAdmin: req.user.role.includes('ADMIN') }))
// router.get('/editar-contentidos', ensureAuthenticated, checkRole(['EDITOR', 'ADMIN']), (req, res) => res.render('context-editor', { user: req.user }))
// router.get('/admin-zone', ensureAuthenticated, checkRole(['ADMIN']), (req, res) => res.render('admin', { user: req.user }))




module.exports = router
