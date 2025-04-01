const express = require('express');
const characterController = require('./../controllers/characterController')

const router = express.Router()

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Retrieves all characters
 *     description: Returns a paginated list of Saint Seiya characters.
 *     responses:
 *       200:
 *         description: Successfully retrieved the characters list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 results:
 *                   type: integer
 *                   example: 90
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 90
 *                     totalPages:
 *                       type: integer
 *                       example: 9
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     perPage:
 *                       type: integer
 *                       example: 10
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 *                     nextPage:
 *                       type: integer
 *                       nullable: true
 *                       example: 2
 *                     prevPage:
 *                       type: integer
 *                       nullable: true
 *                       example: null
 *                 data:
 *                   type: object
 *                   properties:
 *                     characters:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "67d47a5d211d5f850883bb8b"
 *                           name:
 *                             type: string
 *                             example: "Seiya"
 *                           alias:
 *                             type: string
 *                             example: "Pegasus Seiya"
 *                           gender:
 *                             type: string
 *                             example: "male"
 *                           constellation:
 *                             type: string
 *                             example: "Pegasus"
 *                           rank:
 *                             type: string
 *                             example: "Bronze"
 *                           cloth:
 *                             type: string
 *                             example: "Pegasus Cloth"
 *                           mentor:
 *                             type: string
 *                             example: "Marin"
 *                           techniques:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["Pegasus Ryuseiken", "Pegasus Suiseiken"]
 *                           image:
 *                             type: string
 *                             format: uri
 *                             example: "https://saintseiyaapi-71b85b0cc3ba.herokuapp.com/assets/seiya.jpeg"
 *                         example:
 *                           - _id: "67d47a5d211d5f850883bb8b"
 *                             name: "Seiya"
 *                             alias: "Pegasus Seiya"
 *                             gender: "male"
 *                             constellation: "Pegasus"
 *                             rank: "Bronze"
 *                             cloth: "Pegasus Cloth"
 *                             mentor: "Marin"
 *                             techniques: ["Pegasus Ryuseiken", "Pegasus Suiseiken"]
 *                             image: "https://saintseiyaapi-71b85b0cc3ba.herokuapp.com/assets/seiya.jpeg"
 *                           - _id: "67d47a5d211d5f850883bb8c"
 *                             name: "Shiryu"
 *                             alias: "Dragon Shiryu"
 *                             gender: "male"
 *                             constellation: "Dragon"
 *                             rank: "Bronze"
 *                             cloth: "Dragon Cloth"
 *                             mentor: "Dohko de Libra"
 *                             techniques: ["Rozan Shoryuha", "Excalibur"]
 *                             image: "https://saintseiyaapi-71b85b0cc3ba.herokuapp.com/assets/shiryu.jpeg"
 */
router
  .route('/')
  .get(characterController.getAllCharacters)

  /**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Retrieves a specific character by ID
 *     description: Returns the details of a Saint Seiya character based on the provided character ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the character to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the character details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67d47a5d211d5f850883bb8c"
 *                     name:
 *                       type: string
 *                       example: "shiryu"
 *                     alias:
 *                       type: string
 *                       example: "dragon shiryu"
 *                     gender:
 *                       type: string
 *                       example: "male"
 *                     constellation:
 *                       type: string
 *                       example: "dragon"
 *                     rank:
 *                       type: string
 *                       example: "bronze"
 *                     cloth:
 *                       type: string
 *                       example: "dragon cloth"
 *                     mentor:
 *                       type: string
 *                       example: "dohko"
 *                     techniques:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["rozanha", "excalibur"]
 *                     image:
 *                       type: string
 *                       format: uri
 *                       example: "https://saintseiyaapi-71b85b0cc3ba.herokuapp.com/assets/shiryu.jpeg"
 *                 example:
 *                   status: "success"
 *                   data:
 *                     _id: "67d47a5d211d5f850883bb8c"
 *                     name: "shiryu"
 *                     alias: "dragon shiryu"
 *                     gender: "male"
 *                     constellation: "dragon"
 *                     rank: "bronze"
 *                     cloth: "dragon cloth"
 *                     mentor: "dohko"
 *                     techniques: ["rozanha", "excalibur"]
 *                     image: "https://saintseiyaapi-71b85b0cc3ba.herokuapp.com/assets/shiryu.jpeg"
 */
router
  .route('/:id')
  .get(characterController.getCharacter)

module.exports = router