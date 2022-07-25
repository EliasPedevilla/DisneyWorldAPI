import express from 'express'
import {
  getAllGenres,
  createGenre,
  deleteGenre
} from '../controllers/genres.controller.js'

const genresRouter = express.Router()

genresRouter.get('/', getAllGenres)
genresRouter.post('/create', createGenre)
genresRouter.delete('/delete/:genreId', deleteGenre)

export default genresRouter
