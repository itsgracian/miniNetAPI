const { findByOne } = require('../models/Query');
const { messageResponse } = require('../helpers/index');

exports.checkIfMovieAdded = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { id } = req.user;
    const verify = await findByOne('favorites', 'movie', Number(movieId));
    if (verify && verify.user === id) {
      const errorMessage = {
        error: 'sorry you already added it to your favorites.'
      };
      return messageResponse(res, 409, errorMessage);
    }
    next();
  } catch (error) {
    const errorMessage = {
      error: 'An error occurred try again later.'
    };
    return messageResponse(res, 500, errorMessage);
  }
};

exports.checkIfIamAllowedToRemoveMovies = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const {id} = req.user;
    const verify = await findByOne('favorites', 'movie', Number(movieId));
    if (verify && verify.user !== id) {
      const errorMessage = {
        error: 'sorry you are not allowed to perform this action.'
      };
      return messageResponse(res, 409, errorMessage);
    }
    next();
  } catch (error) {
    const errorMessage = {
      error: 'An error occurred try again later.'
    };
    return messageResponse(res, 500, errorMessage);
  }
};
