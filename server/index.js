require('dotenv').config();

const express = require('express');
const cors = require('cors');
//const { Pool } = require('pg');
const {query} = require('./helpers/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());


// Route to get all tasks
app.get('/', async (req, res) => {
    console.log(query)
    try {
        const result = await query('SELECT * FROM tasks');
        const rows  =result.rows ? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        console.error( error);
        res.statusMessage = error.message;
        res.status(500).json({ error: error });
    }
});

// Route to create a new task
app.post('/new', async (req, res) => {
    try{
        const result = await query('INSERT INTO tasks (description) VALUES ($1) RETURNING *', [req.body.description]);
    
        return res.status(200).json({ id: result.rows[0].id });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }

   
    });



// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.delete("/delete/:id", async (req,res)=>{
    
    const id  = Number(req.params.id)
    try{
    
    const result = await query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    res.status(200).json({ id:id });
    }
    catch(error){
    console.error(error);
    res.statusMessage = error;
    res.status(500).json({error:error.message});
    }
})
