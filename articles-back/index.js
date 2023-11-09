const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'articles-db',
  user: 'articles_user',
  password: 'articles_password',
  database: 'articles_db',
});

db.connect((err) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Connected to MySQL');
    createTable();
  }
});

function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS article (
      id INT AUTO_INCREMENT PRIMARY KEY,
      libelle VARCHAR(255) NOT NULL,
      prix DECIMAL(10, 2) NOT NULL
    )
  `;
  db.query(sql, (err) => {
    if (err) {
      console.log('Error creating table:', err);
    } else {
      console.log('Table created');
    }
  });
}

app.get('/articles', (req, res) => {
  const sql = 'SELECT * FROM article';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('Error fetching articles:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.post('/articles', (req, res) => {
  const { libelle, prix } = req.body;
  const sql = 'INSERT INTO article (libelle, prix) VALUES (?, ?)';
  db.query(sql, [libelle, prix], (err, result) => {
    if (err) {
      console.log('Error creating article:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const newArticle = { id: result.insertId, libelle, prix };
      res.status(201).json(newArticle);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
