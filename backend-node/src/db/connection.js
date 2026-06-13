const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'wxt_user',
  password: process.env.DB_PASSWORD || 'wxt_password',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'wxt_db'
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;
