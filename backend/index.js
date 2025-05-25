const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'mysql-2ebaaef9-ecommerce-construction-1.c.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_LDkcNv993LfkzZNEvkR',
  database: 'defaultdb',
  port: 23012, 
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
