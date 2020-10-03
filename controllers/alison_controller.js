const express = require('express')
const alison = express.Router()
const Alison = require('../models/alison.js')
const alisonSeed = require('../models/alison_seed.js')

//GET
alison.get('/', (req,res)=>{
  Alison.find({}, (err, foundAlison)=>{
    res.json(foundAlison)
  })
})

//SEED

alison.get('/setup/seedone', (req, res) => {
  Alison.insertMany(alisonSeed, (err, manyAlison) => {
    res.redirect('/')
  })
})


module.exports = alison
