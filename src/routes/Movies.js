const express = require('express');
const App = express.Router();
const {
  createMovies,
  getAllMovies,
  getSingleMovie
} = require('../controllers/Movies');
const { auth } = require('../middleware/User');
/**
 * Create movie
 */
App.post('/create', auth, createMovies);
/**
 * get All movies
 */
App.get('/', getAllMovies);
/**
 * get single movie
 */
App.get('/:slug', getSingleMovie);

module.exports = App;
