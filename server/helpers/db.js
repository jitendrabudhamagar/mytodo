require('dotenv').config();
const { Pool } = require('pg');

const openDb = () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME, // Corrected from DB_DATABASE to DB_NAME
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });
    return pool;
};

const query = (sql, values) => {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = openDb(); // Moved pool creation inside try block
            const result = await pool.query(sql, values);
            resolve(result);
        } catch (error) {
            reject(error.message);
        }
    });
};

module.exports = { query };
