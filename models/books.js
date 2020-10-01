const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
  title: String,
  authors: String,
  description: String,
  thumbnail: String,
  averageRating: Number
})

const Books = mongoose.model('Books', booksSchema)

module.exports = Books
