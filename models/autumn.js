const mongoose = require('mongoose')

const autumnSchema = new mongoose.Schema({
  titleTwo: String,
  authorTwo: String,
  infoTwo: String,
  imgTwo: String,
  ratingTwo: Number
})

const Autumn = mongoose.model('Autumn', autumnSchema)

module.exports = Autumn
