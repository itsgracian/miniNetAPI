const express = require('express');
const user = require('./User');
const movies = require('./Movies');
const favorite = require('./Favorite');

const App = express.Router();

App.use('/movies',movies);
App.use('/users', user);
App.use('/favorites', favorite);

module.exports = App;