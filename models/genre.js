import sequelize from '../config/sequelize.js'
import { DataTypes } from 'sequelize'

const Genre = sequelize.define(
  'genres',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    urlPhoto: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
)

export default Genre
