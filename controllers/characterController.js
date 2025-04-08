const mongoose = require('mongoose');
const AppError = require('./../utils/appError')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')
const Character = require('../models/characterModel')

exports.getAllCharacters = catchAsync(async (req, res) => {

  const { rank } = req.query;

  let query = Character.find();

  if (rank) {
    query = query.where('rank').equals(rank);
  }

  const features = new APIFeatures(query, req.query);
  await features.paginate(); 
  
  const characters = await features.query;

  const charactersWithImageUrl = characters.map(character => {
    const characterObject = character.toObject();

    return { 
      ...characterObject,
      image: characterObject.image 
        ? `https://${req.get('host')}/assets/${characterObject.image.replace('.png', '.jpeg')}`
        : undefined, 
    };
  }).sort((a, b) => a.name.localeCompare(b.name));

  res.status(200).json({
    status: 'success',
    results: characters.length,
    pagination: features.paginationData, 
    data: { characters: charactersWithImageUrl },
  });
});

exports.getCharacter = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError('No character found for this ID', 400));
  }

  const character = await Character.findById(req.params.id)

  if(!character || !mongoose.Types.ObjectId.isValid(req.params.id)){
    return next(new AppError(`No character found for this ID`, 404))
  }

  const characterObject = character.toObject()

  res.status(200).json({
    status: 'success',
    data: { 
      ...characterObject,
      image: characterObject.image 
      ? `https://${req.get('host')}/assets/${characterObject.image.replace('.png', '.jpeg')}`
      : undefined, 
     },
  })
})