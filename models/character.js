import sequelize from '../config/sequelize.js'
import { DataTypes } from 'sequelize'

const Character = sequelize.define(
  'character',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    urlPhoto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z\s]+$/g,
        len: [3, 20]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        max: 99,
        min: 0
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        max: 999,
        min: 0
      }
    },
    history: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z\s¿!¡;,:./?#@()"]+$/g,
        len: [3, 500]
      }
    }
  },
  {
    timestamps: false
  }
)

export default Character
