const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
const port = 3001;

// Middleware
app.use(cors());

// Database connection
const openDb = () => {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'todo_database',
        password: 'Finland@2061',
        port: 5432,
    });
    return pool;
};

// Route to get all tasks
// Route to get all tasks
app.get('/tasks', async (req, res) => {
    const pool = openDb();
    try {
        const query = 'SELECT * FROM tasks;';
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        pool.end(); // Close the connection pool
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
