const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopSchema = new Schema({
    
  name: {
    type: String,
    require: true
  },

  shopImg: {
    type: String,
    default: "https://res.cloudinary.com/dc9ajab1i/image/upload/v1606422917/project2/shopImgDefault.png",
    require: true
  },

  nationality: {
    type: String,
    enum: ['Italian', 'Mexican', 'Colombian', 'Chinese']
    },
  
  description: {
    type: String
  },

  schedule: {
    type: String,
    default: 'Unknown'
  },
    
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  },

  owner: {
    type: String
  }
  
}, {
  timestamps: true
})

shopSchema.index({ location: '2dsphere' })

module.exports = mongoose.model('Shop', shopSchema)