const { Pool } = require('pg')

const pool = new Pool({
    // connectionString: process.env.DATABASE_URL,
    // host: 'https://dang-mvp-project.herokuapp.com/'
    // ssl: {
    //   rejectUnauthorized: false
    // }

    // for local env
    user: 'thuandang', // TODO/EXAMPLE: REPLACED WITH PLACEHOLDER
    database: 'mvp_project',  // TODO: Replace process.env.DATABASE_NAME
    host: 'localhost',
    password: '',// TODO: Replace process.env.DATABASE_PASSWORD
  });

module.exports = pool