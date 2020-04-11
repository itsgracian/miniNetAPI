const slugify = require('slugify');
const { findByOne, create, findAll } = require('../models/Query');
const { messageResponse } = require('../helpers/index');

const tableName = 'movies';
class Movies {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @return {Object}
   */
  async createMovies(req, res) {
    try {
      const { title, imageUrl, director, writter, awards, released } = req.body;
      const columns = [
        'title',
        'image',
        'director',
        'writer',
        'awards',
        'released',
        'slug'
      ];
      const values = [
        title.toLowerCase(),
        imageUrl,
        director,
        writter,
        awards,
        released,
        slugify(title.toLowerCase(), '-')
      ];
      // create
      const save = await create(tableName, columns, values);
      const message = {
        success: true,
        message: 'Movie saved successfully.',
        data: save
      };
      return messageResponse(res, 201, message);
    } catch (error) {
      const errorMessage = {
        error: 'An error occurred while saving a movie.'
      };
      return messageResponse(res, 500, errorMessage);
    }
  }
  /**
   *
   * @param {req} req
   * @param {res} res
   * @returns object
   */
  // get all Movies
  async getAllMovies(req, res) {
    try {
      const find = await findAll(tableName);
      const response = {
        data: find
      };
      return messageResponse(res, 200, response);
    } catch (error) {
      const errorMessage = {
        error: 'An error occurred while fetching movies.'
      };
      return messageResponse(res, 500, errorMessage);
    }
  }

  async getSingleMovie(req, res) {
    try {
      const { slug } = req.params;
      const verifyMovie = await findByOne(tableName, 'slug', slug);
      return messageResponse(res, 200, verifyMovie);
    } catch (error) {
      const errorMessage = {
        error: 'An error occurred while fetching movie.'
      };
      return messageResponse(res, 500, errorMessage);
    }
  }
}

module.exports = new Movies();
