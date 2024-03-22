const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection pool setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo_database',
    password: 'Finland@2061',
    port: 5432,
});

// Route to get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const query = 'SELECT * FROM tasks;';
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(200).json({ error: 'Internal Server Error' });
    }
});

// Route to create a new task
app.post('/new', (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ error: 'Description is required' });
    }

    pool.query('INSERT INTO tasks (description) VALUES ($1) RETURNING *', [description], (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
});

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); j
