const express = require('express');
const App = express.Router();
// controllers
const { addFavorite, getMyFavoriteMovie, removeMovieFromFavorites } = require('../controllers/Favorites');
// middlewares
const { auth } = require('../middleware/User');
const {
  checkIfMovieAdded,
  checkIfIamAllowedToRemoveMovies
} = require('../middleware/Favorite');
const { checkMovie } = require('../middleware/Movie');
/**
 * add movie to favorite
 */
App.post('/:movieId/add', auth, checkMovie, checkIfMovieAdded, addFavorite);

/**
 * get user favorite movie
 */
App.get('/movies', auth, getMyFavoriteMovie);

/**
 * remove movie from your favorite
 */

App.delete(
  '/:movieId/remove',
  auth,
  checkMovie,
  checkIfIamAllowedToRemoveMovies,
  removeMovieFromFavorites
);

module.exports = App;
