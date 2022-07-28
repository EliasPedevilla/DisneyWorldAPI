import { Genre } from '../models/index.js'

export const getAllGenres = async (req, res, next) => {
  try {
    const genres = await Genre.findAll()
    res.status(200).json(genres)
  } catch (error) {
    next(error)
  }
}

export const createGenre = async (req, res, next) => {
  const data = req.body
  try {
    const genres = await Genre.create(data)

    res.status(201).json(genres)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send('In the body there are incorrect or empty fields')
    } else {
      next(error)
    }
  }
}

export const deleteGenre = async (req, res, next) => {
  const { genreId } = req.params
  if (isNaN(genreId)) {
    return res.status(400).send('The id must be a number')
  }

  try {
    const response = await Genre.destroy({ where: { id: genreId } })

    if (response === 0) {
      return res.status(404).send('The genre does not exist')
    }

    res.status(200).send('Genre deleted')
  } catch (error) {
    next(error)
  }
}
