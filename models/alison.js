const mongoose = require('mongoose')

const alisonSchema = new mongoose.Schema({
  titleOne: String,
  authorOne: String,
  infoOne: String,
  imgOne: String,
  ratingOne: Number
})

const Alison = mongoose.model('Alison', alisonSchema)

module.exports = Alison
