const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: 'https://dang-mvp-project.herokuapp.com/',
    ssl: {
      rejectUnauthorized: false
    }
    // for local env
    // user: 'thuandang', 
    // database: 'mvp_project', 
    // host: 'localhost',
    // password: '',
  });

module.exports = pool