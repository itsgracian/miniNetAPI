const { create, deleteByOne } = require('../models/Query');
const { messageResponse } = require('../helpers/index');
const pg = require('../config/connection');

const tableName = 'favorites';
class Favorite {
  /**
   *
   * @param {req} req
   * @param {res} res
   * @returns object
   */
  async addFavorite(req, res) {
    try {
      const { movieId } = req.params;
      const { id } = req.user;
      const columns = ['"user"', 'movie'];
      const values = [id, Number(movieId)];
      const save = await create(tableName, columns, values);
      const response = {
        success: true,
        message: 'movie has been added to your favorites',
        data: save
      };
      return messageResponse(res, 201, response);
    } catch (error) {
      const errorMessage = {
        error: 'An error occurred while adding favorite movie.'
      };
      return messageResponse(res, 500, errorMessage);
    }
  }
  /**
   *
   * @param {req} req
   * @param {res} res
   */
  async getMyFavoriteMovie(req, res) {
    try {
      const sql = `SELECT * FROM ${tableName} INNER JOIN users ON 
      users.id=${tableName}.user INNER JOIN movies ON movies.movie_id=${tableName}.movie WHERE "user"=$1`;
      const { id } = req.user;
      const getMovie = await pg.query(sql, [id]);
      return messageResponse(res, 200, getMovie.rows);
    } catch (error) {
      const errorMessage = {
        error: 'An error occurred while fetching favorites movie.'
      };
      return messageResponse(res, 500, errorMessage);
    }
  }
  /**
   *
   * @param {req} req
   * @param {res} res
   */
  async removeMovieFromFavorites(req, res) {
    try {
      const { movieId } = req.params;
      await deleteByOne(tableName, 'movie', Number(movieId));
      const response = {
        success: true,
        message: 'removed from you favorite movie'
      };
      return messageResponse(res, 200, response);
    } catch (error) {
      const errorMessage = {
        error: 'An error occurred while removing movie from favorites.'
      };
      return messageResponse(res, 500, errorMessage);
    }
  }
}
module.exports = new Favorite();
