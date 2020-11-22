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
        type: String
    },
    
    // favorites: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Shop'
    // },
    
    role: {
      type: String,
      enum: ['ADMIN', 'OWNER', 'GUEST'],
      default: 'GUEST'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)