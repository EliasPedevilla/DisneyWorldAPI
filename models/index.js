import sequelize from "../config/sequelize.js";

import Movie from "./movie.js";
import Character from "./character.js";
import MovieCharacter from "./movieCharacter.js";
import User from "./user.js";
import Genre from "./genre.js";

Movie.belongsToMany(Character, { through: MovieCharacter });
Character.belongsToMany(Movie, { through: MovieCharacter });
Genre.hasMany(Movie);
Movie.belongsTo(Genre);

export { Movie, Character, MovieCharacter, User, Genre };
