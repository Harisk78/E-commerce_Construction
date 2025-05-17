const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'product_db',
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/products', (req, res) => {
  db.query('SELECT id, name, image FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const products = results.map(row => ({
      id: row.id,
      name: row.name,
      imageUrl: `data:image/jpeg;base64,${row.image.toString('base64')}`,
    }));

    res.json(products);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
