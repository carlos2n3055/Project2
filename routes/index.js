module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/user-zone', require('./auth.routes.js'))
    app.use('/shops', require('./shop.routes.js'))
    app.use('/api', require('./api.routes.js'))
}