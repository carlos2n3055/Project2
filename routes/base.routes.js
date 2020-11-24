const express = require('express')
const router = express.Router()
const User = require("../models/user-model")

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Not authorized, please log in' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' })


// Endpoints
router.get('/', (req, res) => res.render('index'))



module.exports = router
