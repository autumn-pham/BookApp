const express = require('express')
const carole = express.Router()
const Carole = require('../models/carole.js')
const caroleSeed = require('../models/carole_seed.js')

//GET
carole.get('/', (req,res)=>{
  Carole.find({}, (err, foundCarole)=>{
    res.json(foundCarole)
  })
})

//SEED

carole.get('/setup/seedthree', (req, res) => {
  Carole.insertMany(caroleSeed, (err, manyCarole) => {
    res.redirect('/')
  })
})


module.exports = carole
