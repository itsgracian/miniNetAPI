const pg = require('../config/connection');
class DBQuery {
  /**
   *
   * @param {table} table
   * @param {column} column
   * @param {value} value
   */
  async findByOne(table, column, value) {
    try {
      const sql = `SELECT * FROM ${table} WHERE ${column} =$1`;
      const query = await pg.query(sql, [value]);
      return query.rows[0];
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {*} table
   * @param {*} columns
   * @param {*} values
   */
  async create(table, columns, values) {
    try {
      const sql = `INSERT INTO ${table} (${columns.map((item) => item)}) 
         VALUES (${columns.map((item, i) => '$' + Number(i + 1))}) RETURNING *`;
      const query = await pg.query(sql, values);
      return query.rows[0];
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {table name} table
   * @returns {Object} object
   */
  async findAll(table) {
    try {
      const sql = `SELECT * FROM ${table}`;
      const query = await pg.query(sql);
      return query.rows;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {table} table
   * @param {column} column
   * @param {value} value
   */
  async deleteByOne(table, column, value) {
    try {
      const sql = `DELETE FROM ${table} WHERE ${column} = $1`;
      const query = await pg.query(sql, [value]);
      return query;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new DBQuery();
