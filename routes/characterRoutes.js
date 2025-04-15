const express = require('express');
const characterController = require('./../controllers/characterController');

const router = express.Router();

router.route('/').get(characterController.getAllCharacters);
router.route('/:id').get(characterController.getCharacter);

module.exports = router;
