const mongoose = require('mongoose')
const User = require('../models/user-model.js')
const Shop = require('../models/shop-model.js')

const dbName = 'shopsInt'
mongoose.connect(`mongodb://localhost/${dbName}`)


// // -----  SHOPS SEEDS -----
// const shops = [
//   {
//     name: "Luigi's",
//     nationality: 'Italian',
//     description: 'Your favorite Italian place',
//     location: {
//       type: 'Point',
//       coordinates: [39.859256, -4.022213]
//     }
//   },
//   {
//     name: "Don Manolito",
//     nationality: 'Mexican',
//     description: 'Your favorite Mexican place',
//     location: {
//       type: 'Point',
//       coordinates: [39.881777, -4.032335]
//     }
//   },
//   {
//     name: "Club Colombia",
//     nationality: 'Colombian',
//     description: 'Your favorite Colombian place',
//     location: {
//       type: 'Point',
//       coordinates: [39.858187, -4.023283]
//     }
//   },
//   {
//     name: "El Dragon Rojo",
//     nationality: 'Chinese',
//     description: 'Your favorite Chinese place',
//     location: {
//       type: 'Point',
//       coordinates: [39.898187, -4.060283]
//     }
//   }
// ]

// Shop
//   .create(shops)
//   .then(allShopsCreated => {
//     console.log(`Created ${allShopsCreated.length} shops`)
//     mongoose.connection.close()
//   })
//   .catch(err => next(new Error(err)))



// -----  USERS SEEDS -----
const users = [
    {
    username: 'usuario1',
    password: 'usuario1',
    profileImg: " ",
    // favorites: " ",
    role: 'ADMIN'
    }
]

User
  .create(users)
  .then(allUsersCreated => {
    console.log(`Created ${allUsersCreated.length} users`)
    mongoose.connection.close()
  })
    .catch(err => next(new Error(err)))