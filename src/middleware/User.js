const { findByOne } = require('../models/Query');
const { messageResponse } = require('../helpers/index');
const { checkToken } = require('../helpers/index');
exports.checkUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const verifyUsername = await findByOne('users', 'username', username);
    if (verifyUsername) {
      // verify
      const message = {
        errors: 'username already exist'
      };
      return messageResponse(res, 409, message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const verifyemail = await findByOne('users', 'email', email);
    if (verifyemail) {
      // verify
      const message = {
        errors: 'email already exist'
      };
      return messageResponse(res, 409, message);
    }
    next();
  } catch (error) {
    const errorMessage = {
      error: 'An error occurred try again.'
    };
    return messageResponse(res, 500, errorMessage);
  }
};

exports.auth = async (req, res, next) => {
  try {
    const tableName = 'users';
    const column = 'id';
    const { authorization } = req.headers;
    const verifyToken = await checkToken(authorization);
    if (!verifyToken) {
      const errorMessage = {
        error: 'Token Error: please login again'
      };
      return messageResponse(res, 401, errorMessage);
    }
    // check
    const verifyUser = await findByOne(tableName, column, verifyToken.id);
    if (!verifyUser) {
      const message = { error: 'Unauthorized, please login.' };
      return messageResponse(res, 401, message);
    }
    req.user = verifyUser;
    next();
  } catch (error) {
    const errorMessage = {
      error: 'Something wrong please try again'
    };
    return messageResponse(res, 500, errorMessage);
  }
};
