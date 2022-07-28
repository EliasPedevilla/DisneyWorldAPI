import { Character, Genre, Movie, MovieCharacter } from '../models/index.js'
import { Op } from 'sequelize'

export const getAllmovies = async (req, res, next) => {
  const { title, genre, order } = req.query
  const filterGenre = {}
  const filterTitle = {}

  if (title) {
    filterTitle.title = { [Op.iLike]: title }
  }

  if (genre) {
    filterGenre.name = { [Op.iLike]: genre }
  }

  let asc = 'ASC'

  if (order && !(order === 'ASC' || order === 'DESC')) {
    return res.status(400).send('The query order must be "ASC" or "DESC"')
  }

  if (order && order !== asc) {
    asc = order
  }
  try {
    const moviesWithCharacters = await Movie.findAll({
      where: filterTitle,
      include: {
        model: Genre,
        attributes: [],
        where: filterGenre
      },
      order: [['creationDate', asc]],
      attributes: ['id', 'urlPhoto', 'title', 'creationDate']
    })

    res.status(200).json(moviesWithCharacters)
  } catch (error) {
    next(error)
  }
}

export const getOneMovie = async (req, res, next) => {
  const { movieId } = req.params

  if (isNaN(movieId)) {
    return res.status(400).send('The id must be a number')
  }

  try {
    const movie = await Movie.findOne({
      include: [
        {
          model: Character,
          attributes: ['name'],
          through: {
            attributes: []
          }
        },
        {
          model: Genre,
          attributes: ['name']
        }
      ],
      where: { id: movieId }
    })

    if (movie === null) {
      return res.status(404).send('The movie does not exist')
    }

    res.status(200).json(movie)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const addMovie = async (req, res, next) => {
  const data = req.body

  try {
    const movie = await Movie.create(data)

    const movieCharacter = await Promise.all(
      data.characters.map(async (characterId) => {
        return await MovieCharacter.create({
          movieId: movie.dataValues.id,
          characterId
        })
      })
    )

    movie.dataValues.char = movieCharacter

    res.status(201).json(movie)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send('In the body there are incorrect or empty fields')
    } else {
      next(error)
    }
  }
}

export const updateMovie = async (req, res, next) => {
  const data = req.body
  const { movieId } = req.params

  if (isNaN(movieId)) {
    return res.status(400).send('The id must be a number')
  }

  try {
    const movie = await Movie.update(data, {
      where: {
        id: movieId
      }
    })

    if (movie[0] === 0) {
      return res.status(404).send('The movie does not exist')
    }

    res.status(200).json(movie)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send('In the body there are incorrect or empty fields')
    } else {
      next(error)
    }
  }
}

export const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params

  if (isNaN(movieId)) {
    return res.status(400).send('The id must be a number')
  }

  try {
    const responseMovieCharacterDelete = await MovieCharacter.destroy({
      where: {
        movieId
      }
    })

    const responseMovieDelete = await Movie.destroy({
      where: {
        id: movieId
      }
    })

    if (responseMovieCharacterDelete === 0 || responseMovieDelete === 0) {
      return res.status(404).send('The movie does not exist')
    }

    res.status(200).send('Movie deleted')
  } catch (error) {
    next(error)
  }
}
