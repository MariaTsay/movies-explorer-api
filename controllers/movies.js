const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const Movie = require('../models/movie');
const {
  ERROR_400_MESSAGE,
  ERROR_404_MESSAGE_MOVIE,
  REMOVE_200_MESSAGE_MOVIE,
  ERROR_403_MESSAGE_MOVIE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => res.status(200).send({ data }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((newCard) => res.status(201).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(ERROR_400_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFound(ERROR_404_MESSAGE_MOVIE);
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (req.user._id === owner) {
        Movie.deleteOne(movie)
          .then(() => {
            res.status(200).send(REMOVE_200_MESSAGE_MOVIE);
          })
          .catch(next);
      } else {
        throw new Forbidden(ERROR_403_MESSAGE_MOVIE);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(ERROR_400_MESSAGE));
      } else {
        next(err);
      }
    });
};
