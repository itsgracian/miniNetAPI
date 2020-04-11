const { Pool  } = require('pg');
const dotenv = require('dotenv');
//
dotenv.config();

const { DATABASE_URL } = process.env;
// create connection to database

const connection = new Pool({
  connectionString: DATABASE_URL
});

module.exports = connection;
