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

//POST
books.post('/', (req, res)=>{
  Books.create(req.body, (err, createBooks)=>{
    Books.find({}, (err, foundBooks)=>{
      res.json(foundBooks)
    })
  })
})

//PUT

books.put('/:id', (req, res) => {
  Books.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateBooks) => {
      if (err) {
        res.send(err)
      } else {
        Books.find({}, (err, foundBooks) => {
          res.json(foundBooks)
        })
      }
    }
  )
})

//DELETE

books.delete('/:id', (req, res) => {
  Books.findByIdAndRemove(req.params.id, (err, deleteBooks) => {
    Books.find({}, (err, foundBooks) => {
      res.json(foundBooks)
    })
  })
})

//SEED

books.get('/seed', (req, res) => {
  Books.insertMany(booksSeed, (err, manyBooks) => {
    res.redirect('/')
  })
})


module.exports = books
