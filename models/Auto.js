const mongoose = require('mongoose')

const AutoSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    maxlength: [10, 'A rendszám nem tartalmazhat 10 karakternél többet!'],
  },
  brandAndType: {
    type: String,
    required: true,
    unique: false,
    maxlength: [50, 'A típus nem tartalmazhat 50 karakternél többet!'],
  },
  alapitva: Number,
  elnok: String
})

module.exports = mongoose.model('Auto', AutoSchema, 'cars')
