const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// MIDDLEWARE CONFIG
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION POOL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'transitops',
  password: 'postgres',
  port: 5432,
});

// Verify DB connection on startup
pool.query('SELECT NOW()')
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch((err) => console.error('❌ PostgreSQL connection error:', err.message));

// Make pool accessible to route files later
app.locals.pool = pool;

// API HEALTH CHECK
app.get('/', (req, res) => {
  res.json({ status: 'Server running' });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 TransitOps server running on http://localhost:${PORT}`);
});
