module.exports = app => {
    app.locals.title = 'International Shops'
    app.locals.keymaps = process.env.KEYMAPS
}