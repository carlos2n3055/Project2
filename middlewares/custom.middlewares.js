const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Not authorized, please log in' })
const checkRoleAdmin = (req, res, next) => req.user.role === "ADMIN" ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' })



// const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Not authorized, you need a permit' })