import { Op } from 'sequelize'
import { Character, Movie } from '../models/index.js'

export const getAllCharacters = async (req, res, next) => {
  const querys = req.query
  const movieFilter = {}
  const filter = {}

  Object.entries(querys).forEach(([key, value]) => {
    if (key === 'name') filter[key] = { [Op.iLike]: value }
    if (key === 'weight' || key === 'age') {
      if (isNaN(value)) {
        return res.status(400).send(`The ${key} must be a number`)
      } else {
        filter[key] = parseInt(value)
      }
    }
    if (key === 'movies') movieFilter.title = { [Op.iLike]: querys.movie }
  })

  try {
    const charactersWithMovies = await Character.findAll({
      where: filter,
      include: {
        model: Movie,
        attributes: [],
        through: {
          attributes: []
        },
        where: movieFilter,
        required: false
      },
      attributes: ['urlPhoto', 'name']
    })

    res.status(200).json(charactersWithMovies)
  } catch (error) {
    next(error)
  }
}

export const getOneCharacther = async (req, res, next) => {
  const { characterId } = req.params

  if (isNaN(characterId)) {
    return res.status(400).send('The id must be a number')
  }

  try {
    const character = await Character.findOne({
      include: {
        model: Movie,
        attributes: ['title'],
        through: {
          attributes: []
        }
      },
      where: { id: characterId }
    })

    if (character === null) {
      return res.status(404).send('The character does not exist')
    }

    res.status(200).json(character)
  } catch (error) {
    next(error)
  }
}

export const addCharacther = async (req, res, next) => {
  const data = req.body

  try {
    await Character.create(data)
    res.status(201).send('The character has been created')
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send('In the body there are incorrect or empty fields')
    } else {
      next(error)
    }
  }
}

export const updateCharacther = async (req, res, next) => {
  const data = req.body
  const { characterId } = req.params

  if (isNaN(characterId)) {
    return res.status(400).send('The id must be a number')
  }

  try {
    const response = await Character.update(data, {
      where: {
        id: characterId
      }
    })

    if (response[0] === 0) {
      return res.status(404).send('The character does not exist')
    }

    res.status(200).send('The character has been updated')
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send('In the body there are incorrect or empty fields')
    } else {
      next(error)
    }
  }
}

export const deleteCharacther = async (req, res, next) => {
  const { characterId } = req.params

  if (isNaN(characterId)) {
    return res.status(400).send('The id must be a number')
  }

  try {
    const response = await Character.destroy({
      where: {
        id: characterId
      }
    })

    if (response === 0) {
      return res.status(404).send('The character does not exist')
    }

    res.status(200).send('Character deleted')
  } catch (error) {
    next(error)
  }
}
