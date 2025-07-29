const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://www.adflyn.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true // optional: only if using cookies/auth
}));

const PORT = 8000;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: false,
//   ssl: {
//   rejectUnauthorized: false
// }
});


app.post('/api/waitlist', async (req, res) => {
  console.log(process.env.PG_USER, process.env.PG_HOST, process.env.PG_DATABASE, process.env.PG_PASSWORD, process.env.PG_PORT);
  const { name, email, company_name, designation, usage } = req.body;
  console.log('Received data:', req.body);
  try {
    const query = `
    INSERT INTO waitlist (name, email, company_name, designation, usage, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING *;
    `;
    const values = [name, email, company_name, designation, usage];
    
    const result = await pool.query(query, values);
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting into waitlist:', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

app.get('/api/user_waitlist', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM waitlist ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});
app.get('/health', (req, res) => {
  res.status(200).json({ status: 200, health: 'ok' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});