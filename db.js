const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'new_password',
  database: 'my_database',
  connectionLimit: 5,
});

module.exports = pool;
