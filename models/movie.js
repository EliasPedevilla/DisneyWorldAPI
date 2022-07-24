import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";
import Genre from "./genre.js";

const Movie = sequelize.define(
  "movies",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    urlPhoto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z\s]+$/g,
        len: [3, 20],
      },
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isDecimal: true,
        max: 5,
        min: 0,
      },
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Genre,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Movie;
