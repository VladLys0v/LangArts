const express = require('express');
const cors = require('cors');
const { createPool } = require('mysql');

const app = express();

app.use(cors());
app.use(express.json());

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

app.get('/:language', (req, res) => {
  const language = req.params.language;
  let joinClause, foreignKey, tableAlias;
  if (language === 'russian') {
    joinClause = 'LEFT JOIN polish ON russian.id = polish.russian_id';
    foreignKey = 'polish_id';
    tableAlias = 'russian';
  } else if (language === 'polish') {
    joinClause = 'LEFT JOIN russian ON polish.russian_id = russian.id';
    foreignKey = 'russian_id';
    tableAlias = 'polish';
  } else {
    return res.status(400).send('Invalid language');
  }

  const query = `SELECT ${tableAlias}.id, ${tableAlias}.word, polish.id AS ${foreignKey} FROM ${tableAlias} ${joinClause}`;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Database query error: ' + error);
      res.status(500).send('Server error');
    } else {
      const data = results.map((result) => {
        return {
          id: result.id,
          word: result.word,
          [foreignKey]: result[foreignKey]
        };
      });
      res.json(data);
    }
  });
});

app.get('/:language/:id', (req, res) => {
  const language = req.params.language;
  const id = req.params.id;

  let joinClause, foreignKey, tableAlias;

  if (language === 'russian') {
    joinClause = 'LEFT JOIN polish ON russian.id = polish.russian_id';
    foreignKey = 'polish_id';
    tableAlias = 'russian';
  } else if (language === 'polish') {
    joinClause = 'LEFT JOIN russian ON polish.russian_id = russian.id';
    foreignKey = 'russian_id';
    tableAlias = 'polish';
  } else {
    return res.status(400).send('Invalid language');
  }

  const query = `SELECT ${tableAlias}.id, ${tableAlias}.word, polish.id AS ${foreignKey} FROM ${tableAlias} ${joinClause} WHERE ${tableAlias}.id = ?`;

  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error('Database query error: ' + error);
      res.status(500).send('Server error');
    } else if (results.length === 0) {
      res.status(404).send('Record not found');
    } else {
      const data = results.map((result) => {
        return {
          id: result.id,
          word: result.word,
          [foreignKey]: result[foreignKey],
        };
      });
      res.json(data[0]);
    }
  });
});

app.post('/:language', (req, res) => {
  const language = req.params.language;
  const word = req.body.word;

  if (!word) {
    return res.status(400).send('Missing word');
  }

  if (language === 'russian') {
    const query = `INSERT INTO russian (word) VALUES ('${word}')`;
    pool.query(query, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Server error');
      }
      const newId = results.insertId;
      const query2 = `INSERT INTO polish (russian_id) VALUES (${newId})`;
      pool.query(query2, (error2, results2) => {
        if (error2) {
          console.error(error2);
          return res.status(500).send('Server error');
        }
        const polishId = results2.insertId;
        const query3 = `UPDATE russian SET polish_id = ${polishId} WHERE id = ${newId}`;
        pool.query(query3, (error3, results3) => {
          if (error3) {
            console.error(error3);
            return res.status(500).send('Server error');
          }
          return res.status(200).json({ message: 'Success' }); // returning json object instead of a plain string
        });
      });
    });
  } else if (language === 'polish') {
    const query = `INSERT INTO polish (word) VALUES ('${word}')`;
    pool.query(query, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Server error');
      }
      const newId = results.insertId;
      const query2 = `INSERT INTO russian (polish_id) VALUES (${newId})`;
      pool.query(query2, (error2, results2) => {
        if (error2) {
          console.error(error2);
          return res.status(500).send('Server error');
        }

        const russianId = results2.insertId;
        const query3 = `UPDATE polish SET russian_id = ${russianId} WHERE id = ${newId}`;
        pool.query(query3, (error3, results3) => {
          if (error3) {
            console.error(error3);
            return res.status(500).send('Server error');
          }
          return res.status(200).json({ message: 'Success' }); // returning json object instead of a plain string
        });
      });
    });
  } else {
    return res.status(400).send('Invalid language');
  }
});

app.put('/:language/:id', (req, res) => {
  const language = req.params.language;
  const id = req.params.id;
  const word = req.body.word;

  if (!word) {
    return res.status(400).json({ message: 'Missing word' });
  }

  let query;
  if (language === 'russian') {
    query = `UPDATE russian SET word = '${word}' WHERE id = ${id}`;
  } else if (language === 'polish') {
    query = `UPDATE polish SET word = '${word}' WHERE id = ${id}`;
  } else {
    return res.status(400).json({ message: 'Invalid language' });
  }

  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
    return res.status(200).json({ message: 'Success' });
  });
});

app.delete('/:language/:id', (req, res) => {
  const language = req.params.language;
  const id = req.params.id;

  let primaryTable, foreignTable, foreignKey;
  if (language === 'russian') {
    primaryTable = 'russian';
    foreignTable = 'polish';
    foreignKey = 'russian_id';
  } else if (language === 'polish') {
    primaryTable = 'polish';
    foreignTable = 'russian';
    foreignKey = 'polish_id';
  } else {
    return res.status(400).send('Invalid language');
  }

  const deleteQuery = `DELETE ${primaryTable}, ${foreignTable}
    FROM ${primaryTable}
    LEFT JOIN ${foreignTable} ON ${primaryTable}.id = ${foreignTable}.${foreignKey}
    WHERE ${primaryTable}.id = ?`;

  pool.query(deleteQuery, [id], (error, results) => {
    if (error) {
      console.error('Database query error: ' + error);
      res.status(500).send('Server error');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Word not found');
    } else {
      res.status(204).send();
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

