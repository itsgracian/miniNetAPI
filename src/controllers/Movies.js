const { findByOne, create } = require('../models/Query');
const { messageResponse } = require('../helpers/index');

class Movies {
  async createMovies(req, res) {
    try {
      const { title, imageUrl, director, writter, awards, released } = req.body;
    } catch (error) {}
  }
}

module.exports = new Movies();
