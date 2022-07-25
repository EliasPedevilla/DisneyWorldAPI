import express from 'express'
import {
  getAllmovies,
  getOneMovie,
  addMovie,
  updateMovie,
  deleteMovie
} from '../controllers/movies.controller.js'

const moviesRouter = express.Router()

moviesRouter.get('/', getAllmovies)
moviesRouter.get('/:movieId', getOneMovie)
moviesRouter.post('/create', addMovie)
moviesRouter.put('/update/:movieId', updateMovie)
moviesRouter.delete('/delete/:movieId', deleteMovie)

export default moviesRouter
