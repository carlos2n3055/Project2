const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://carlosmartinsalaslarena:S281281c@cluster0.i1nyl.mongodb.net/shopsInt', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))

module.exports = mongoose