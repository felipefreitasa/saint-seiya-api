const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')
const Character = require('../models/characterModel')

exports.getAllCharacters = catchAsync(async (req, res) => {
  const features = new APIFeatures(Character.find(), req.query).paginate()
  const characters = await features.query

  const charactersWithImageUrl = characters.map(character => {
    const characterObject = character.toObject()

    return { 
      ...characterObject,
      image: characterObject.image 
        ? `${req.protocol}://${req.get('host')}/assets/${characterObject.image.replace('.png', '.jpeg')}`
        : undefined, 
    }
  })

  res.status(200).json({
    status: 'success',
    results: characters.length,
    data: { characters: charactersWithImageUrl },
  })
})

exports.createCharacter = catchAsync(async (req, res) => {
  const newCharacter = await Character.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      character: {
        ...newCharacter.toObject(),
        image: `${req.protocol}://${req.get('host')}/assets/${newCharacter.image}`
      },
    },
  })
})