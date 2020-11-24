const mongoose = require('mongoose')
const User = require('../models/user-model.js')
const Shop = require('../models/shop-model.js')

const dbName = 'shopsInt'
mongoose.connect(`mongodb://localhost/${dbName}`)


// -----  SHOPS SEEDS -----
const shops = [
  {
    name: "Luigi's",
    shopImg: " ",
    nationality: 'Italian',
    description: 'Your favorite Italian place',
    location: {
      type: 'Point',
      coordinates: [39.859256, -4.022213]
    }
  },
  {
    name: "Don Manolito",
    shopImg: " ",
    nationality: 'Mexican',
    description: 'Your favorite Mexican place',
    location: {
      type: 'Point',
      coordinates: [39.881777, -4.032335]
    }
  },
  {
    name: "Club Colombia",
    shopImg: " ",
    nationality: 'Colombian',
    description: 'Your favorite Colombian place',
    location: {
      type: 'Point',
      coordinates: [39.858187, -4.023283]
    }
  },
  {
    name: "El Dragon Rojo",
    shopImg: " ",
    nationality: 'Chinese',
    description: 'Your favorite Chinese place',
    location: {
      type: 'Point',
      coordinates: [39.898187, -4.060283]
    }
  }
]

Shop
  .create(shops)
  .then(allShopsCreated => {
    console.log(`Created ${allShopsCreated.length} shops`)
    mongoose.connection.close()
  })
  .catch(err => next(new Error(err)))



// -----  USERS SEEDS -----
const users = [
  {
    username: 'admin',
    password: '$2b$10$jSe5XzQoeQglKVUTDETXI.Czg3am0HoLScbwcsAhc.u6VjUJWv.Am',
    profileImg: " ",
    favorites: [],
    role: 'ADMIN'
  },
  {
    username: 'owner',
    password: '$2b$10$VRwRQU8M9ffLKvcsOzlj5.1KbHMWIkcERF3YxWVEXlgivSQC9ftvy',
    profileImg: " ",
    favorites: [],
    role: 'OWNER'
  },
  {
    username: 'guest',
    password: '$2b$10$PVWsamuTiuaBTfB/BlxPheJ7prxHHmdBYOEH7P0/TyVlAUFjZhO0W',
    profileImg: " ",
    favorites: [],
    role: 'GUEST'
  }
]

User
  .create(users)
  .then(allUsersCreated => {
    console.log(`Created ${allUsersCreated.length} users`)
    mongoose.connection.close()
  })
    .catch(err => next(new Error(err)))