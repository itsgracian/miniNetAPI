const express = require('express');
const App = express.Router();
const { create, login, LoggedInUser } = require('../controllers/User');

// middlewares
const { checkUsername, checkEmail, auth } = require('../middleware/User');

/**
 * create account
 */
App.post('/create', checkUsername, checkEmail, create);
/**
 * login
 */
App.post('/login', login);
/**
 * access logged in user
 */
App.get('/current', auth, LoggedInUser);

module.exports = App;
