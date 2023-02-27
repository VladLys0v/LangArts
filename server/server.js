const express = require('express');
const cors = require('cors');
const { createConnection } = require('mysql');


const app = express();

app.use(cors());

const connection = createConnection({
  server: 'localhost',
  user: 'root',
  password: 'SalamP0p0lam',
  database: 'vocabulary_api',

  options:{
    trustedconnection: true,
    enableArithPort: true,
    instancename: 'MySQL80'

  },
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database with threadId: ' + connection.threadId);
});

connection.on('error', (err) => {
  console.error('Database error: ' + err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    connection.connect();
  } else {
    throw err;
  }
});

app.get('/words', (req, res) => {
  const query = 'SELECT * FROM russian_words';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Database query error: ' + error);
      res.status(500).send('Server error');
    } else {
      const data = results.map((result) => {
        return Object.values(result).join(' ');
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    }
  });
});