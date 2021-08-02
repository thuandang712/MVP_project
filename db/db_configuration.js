const { Pool } = require('pg')

const pool = new Pool({
    // connectionString: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false
    // }
    user: 'thuandang', // TODO/EXAMPLE: REPLACED WITH PLACEHOLDER
    database: 'mvp_project',  // TODO: Replace process.env.DATABASE_NAME
    password: '',// TODO: Replace process.env.DATABASE_PASSWORD
  });

module.exports = pool