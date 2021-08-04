// dependencies
require('dotenv').config() 
const express = require('express');
const app = express();
const path = require('path')
const db = require('./db/db_configuration');
const cors = require('cors')

// const pr = process.env.NODE_ENV
// port
const PORT = process.env.PORT || 4000;

// middle wares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// handle routes
// POST a task 
app.post('/api/task', async(req, res, next) => {
    try {
        const {task_name} = req.body
        // data validation
        if (typeof task_name !== 'string') {
            res.status(404).send('Bad request')
        } else {
            let {rows} = await db.query('INSERT INTO task (task_name) VALUES ($1) RETURNING *', [task_name])
            res.status(201).json(rows)
        }
    } catch (error) {
        console.log('Internal Server Error')
        res.status(500).json(error)
    }
})

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

// GET a single task based on its ID
app.get('/api/task/:id', async(req, res, next) => {
    try {
        const {id} = req.params;
        let {rows} = await db.query('SELECT * FROM task WHERE task_id = $1', [id])
        res.status(200).json(rows)
    } catch (error) {
        console.log('Internal Server Error')
        res.status(500).json(error)
    }
})

// UPDATE a task based on its ID
app.patch('/api/task/:id', async(req, res, next) => {
    try {
        const {id} = req.params;
        const {task_name} = req.body;
        // data validation
        if (typeof task_name !== 'string') {
            res.status(400).send("Bad Request")
        } else {
            let {rows} = await db.query('UPDATE task SET task_name = $1 WHERE task_id = $2 RETURNING *', [task_name, id])
            res.status(200).json(rows)
        }
    } catch (error) {
        console.log('Internal Server Error')
        res.status(500).json(error)
    }
})

// DELETE a task based on its ID
app.delete('/api/task/:id', async(req, res, next) => {
    try {
        const {id} = req.params;
        let {rows} = await db.query('DELETE FROM task WHERE task_id = $1 RETURNING *', [id])
        res.status(200).json(rows)
    } catch (error) {
        console.log('Internal Server Error')
        res.status(500).json(error)
    }
})

// DELETE all tasks
app.delete('/api/task/', async(req, res, next) => {
    try {
        let {rows} = await db.query('TRUNCATE TABLE task')
        res.status(200).json(rows)
    } catch (error) {
        console.log('Internal Server Error')
        res.status(500).json(error)
    }
})

// handle unknown http reqs
app.use( (req, res, next) => {
    res.status(404).end("Not Found")
})

// listen on port
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})