const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    
    username: {
        type: String,
        require: true
    },

    password: {
        type: String,
        required: true
    },
    
    profileImg: {
        type: String,
        default: "https://res.cloudinary.com/dc9ajab1i/image/upload/v1606421478/project2/profileImgDefault.png"
    },
    
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }],
    
    role: {
      type: String,
      enum: ['ADMIN', 'OWNER', 'GUEST'],
      default: 'GUEST'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)