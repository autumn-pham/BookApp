const express = require('express')
const autumn = express.Router()
const Autumn = require('../models/autumn.js')
const autumnSeed = require('../models/autumn_seed.js')

//GET
autumn.get('/', (req,res)=>{
  Autumn.find({}, (err, foundAutumn)=>{
    res.json(foundAutumn)
  })
})

//SEED

autumn.get('/setup/seedtwo', (req, res) => {
  Autumn.insertMany(autumnSeed, (err, manyAutumn) => {
    res.redirect('/')
  })
})


module.exports = autumn
