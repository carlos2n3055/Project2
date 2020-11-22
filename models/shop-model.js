const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopSchema = new Schema({
    
  name: {
    type: String,
    require: true
  },

  shopImg: {
    type: String,
    require: true
  },

  nationality: {
    type: String,
    enum: ['Italian', 'Mexican', 'Colombian', 'Chinese']
    },
  
  description: {
    type: String
  },

  schedule: {              // Poner horario de tienda !!!!!
    type: String,
    default: 'Unknown'
  },
    
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  }
  
}, {
  timestamps: true
})

shopSchema.index({ location: '2dsphere' })

module.exports = mongoose.model('Shop', shopSchema)