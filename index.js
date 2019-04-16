const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection ({
    host: '0.0.0.0',
    user: 'app',
    password: 'password123',
    database: 'dbname'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.get('/', (req, res) => {
  console.log('Hello world received a request.');
  db.query('SELECT * FROM Estados LIMIT 5', (err, result) => {
    if (err) {
      console.log('ERR')
      return res.status(500).send(err);
    }
    else{
      console.log('OK')
      return res.status(200).send(result);
    }
  })
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
