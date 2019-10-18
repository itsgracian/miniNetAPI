const pg = require('../config/connection');
class DBQuery {
  async findByOne(table, column, value) {
    try {
      const sql = `SELECT * FROM ${table} WHERE ${column} =$1`;
      const query = await pg.query(sql, [value]);
      return query.rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async create(table, columns, values) {
    try {
      const sql = `INSERT INTO ${table} (${columns.map((item) => item)}) 
         VALUES (${columns.map((item, i) => '$' + Number(i + 1))}) RETURNING *`;
      const query = await pg.query(sql, values);
      return query.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new DBQuery();
