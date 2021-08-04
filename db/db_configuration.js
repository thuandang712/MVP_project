const { Pool } = require('pg')

let pool 

if (!process.env.NODE_ENV) {
  pool = new Pool({
    user: 'thuandang', 
    database: 'mvp_project', 
    host: 'localhost',
    password: '',
  })
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: 'https://dang-mvp-project.herokuapp.com/',
    ssl: {
      rejectUnauthorized: false
    }
  })
}


module.exports = pool