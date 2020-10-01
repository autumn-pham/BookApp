const express = require('express')
const books = express.Router()
const Books = require('../models/books.js')
const booksSeed = require('../models/books_seed.js')

//GET
books.get('/', (req, res)=>{
  Books.find({}, (err, foundBooks)=>{
    res.json(foundBooks)
  })
})



module.exports = books
