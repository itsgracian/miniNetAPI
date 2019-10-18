const { findByOne } = require('../models/Query');
const { messageResponse } = require('../helpers/index');

exports.checkMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const verify = await findByOne('movies', 'movie_id', Number(movieId));
    if (!verify) {
      const errorMessage = {
        error: 'sorry movie not found.'
      };
      return messageResponse(res, 404, errorMessage);
    }
    next();
  } catch (error) {
    const errorMessage = {
      error: 'An error occurred try again later.'
    };
    return messageResponse(res, 500, errorMessage);
  }
};
