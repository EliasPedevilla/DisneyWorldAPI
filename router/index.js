import userRouter from './user.router.js'
import charactersRouter from './characters.router.js'
import moviesRouter from './movies.router.js'
import genresRouter from './genres.router.js'
import { isAuthorized } from '../midlewares/autorization.js'

export const router = (app) => {
  app.use('/auth', userRouter)
  app.use('/characters', isAuthorized, charactersRouter)
  app.use('/movies', isAuthorized, moviesRouter)
  app.use('/genres', isAuthorized, genresRouter)
}
