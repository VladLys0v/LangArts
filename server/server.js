const express = require('express');
const cors = require('cors');
const { createPool } = require('mysql');

const app = express();

app.use(cors());

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'SalamP0p0lam',
  database: 'vocabulary_api',
  port: 3306,
  connectionLimit: 10
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database with threadId: ' + connection.threadId);
});

app.get('/words', (req, res) => {
  const query = 'SELECT * FROM russian_words';

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Database query error: ' + error);
      res.status(500).send('Server error');
    } else {
      const data = results.map((result) => {
        return {
          id: result.id,
          word: result.word,
          polish_word_id: result.polish_word_id
        };
      });
      res.json(data);
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});