const mongoose = require('mongoose')

const caroleSchema = new mongoose.Schema({
  titleThree: String,
  authorThree: String,
  infoThree: String,
  imgThree: String,
  ratingThree: Number
})

const Carole = mongoose.model('Carole', caroleSchema)

module.exports = Carole
