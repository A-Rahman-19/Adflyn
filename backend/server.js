const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 8000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'waitlist_db',
  password: 'postgres',
  port: 5432,
});

app.post('/api/waitlist', async (req, res) => {
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

app.get('/health', (req, res) => {
    res.status(200).json({ status: 200, health: 'ok' });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});