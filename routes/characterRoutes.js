const express = require('express');
const characterController = require('./../controllers/characterController')

const router = express.Router()

router
  .route('/')
  .get(characterController.getAllCharacters)
  .post(characterController.createCharacter)

module.exports = router