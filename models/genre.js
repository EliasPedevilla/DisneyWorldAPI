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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z0-9/\s]+$/g,
        len: [3, 20]
      }
    },
    urlPhoto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }
  },
  {
    timestamps: false
  }
)

export default Genre
