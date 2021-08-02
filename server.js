// dependencies
require('dotenv').config() 
const express = require('express');
const app = express();
const path = require('path')
const db = require('./db/db_configuration');

// port
const PORT = process.env.PORT || 4000;

app.use(express.json())

// link to FE
app.use(express.static(path.join(__dirname, 'public')));

// handle routes
// GET all tasks 
app.get('/api/task', async(req, res, next) => {
    try {
        let {rows} = await db.query('SELECT * FROM task')
        res.status(200).json(rows)
    } catch (error) {
        console.log('Internal Server Error')
        res.status(500).json(error)
    }
})




// unknown http reqs
app.use( (req, res, next) => {
    res.status(404).end("Not Found")
})

// listen on port
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})