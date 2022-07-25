import sequelize from '../config/sequelize.js'
import { DataTypes } from 'sequelize'
import Movie from './movie.js'
import Character from './character.js'

const MovieCharacter = sequelize.define(
  'movies-characters',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    characterId: {
      type: DataTypes.INTEGER,
      references: {
        model: Character,
        key: 'id'
      }
    },
    movieId: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie,
        key: 'id'
      }
    }
  },
  {
    timestamps: false
  }
)

export default MovieCharacter
