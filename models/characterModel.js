const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A character must have a name!'],
    unique: true
  },
  alias: {
    type: String,
    required: [true, 'A character must have an alias!']
  },
  gender: {
    type: String,
    required: [true, 'A character must have a gender!']
  },
  constellation: {
    type: String,
    required: [true, 'A character must have a constellation!']
  },
  rank: {
    type: String,
    required: [true, 'A character must have a rank!']
  },
  cloth: {
    type: String,
    required: [true, 'A character must have a cloth!']
  },
  mentor: {
    type: String,
    required: [true, 'A character must have a mentor!']
  },
  techniques: {
    type: [String],
    required: [true, 'A character must have techniques!']
  },
  image: {
    type: String,
    required: [true, 'A character must have an image!']
  }
}, {versionKey: false})

const Character = mongoose.model('Character', characterSchema)

module.exports = Character
