module.exports = {
    ensureAuthenticated: (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Not authorized, please log in' }),
    roleAdmin: (req, res, next) => req.user.role === 'ADMIN' ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' }),
    roleOwner: (req, res, next) => req.user.role === 'OWNER' ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' }),
    roleGuest: (req, res, next) => req.user.role === 'GUEST' ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' }),
    roleAdminOwner: (req, res, next) => req.user.role === 'ADMIN' || req.user.role === 'OWNER' ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' }),
    roleAdminOwnerGuest: (req, res, next) => req.user.role === 'ADMIN' || req.user.role === 'OWNER' || req.user.role === 'GUEST' ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' })
}