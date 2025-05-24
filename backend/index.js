const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 

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

// ✅ Create user_details table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS user_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL
  )
`);

// ✅ Register endpoint
app.post('/register', (req, res) => {
  const { username, password, phone } = req.body;
  db.query('INSERT INTO user_details (username, password, phone) VALUES (?, ?, ?)', [username, password, phone], (err) => {
    if (err) return res.status(500).json({ message: 'Error registering user' });
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// ✅ Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM user_details WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Login error' });
    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// ✅ Get all products
app.get('/products', (req, res) => {
  db.query('SELECT id, name, image FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const products = results.map(row => ({
      id: row.id,
      name: row.name,
      imageUrl: row.image ? `data:image/jpeg;base64,${row.image.toString('base64')}` : null,
    }));

    res.json(products);
  });
});

// ✅ Get distinct product names
app.get('/product-names', (req, res) => {
  db.query('SELECT DISTINCT name FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results.map(row => row.name));
  });
});

// ✅ Get parent products
app.get('/products/parents', (req, res) => {
  db.query('SELECT id, name FROM products WHERE parent_id IS NULL', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ Get child products by parent ID
app.get('/products/:parentId/children', (req, res) => {
  const parentId = req.params.parentId;
  db.query('SELECT id, name, image FROM products WHERE parent_id = ?', [parentId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const children = results.map(row => ({
      id: row.id,
      name: row.name,
      imageUrl: `data:image/jpeg;base64,${row.image.toString('base64')}`,
    }));
    res.json(children);
  });
});

// ✅ Get parent product name by ID
app.get('/products/:parentId/name', (req, res) => {
  const parentId = req.params.parentId;
  db.query('SELECT name FROM products WHERE id = ?', [parentId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ name: results[0].name });
  });
});

// ✅ Get related products for a given product ID
app.get('/relatedproducts/:parentId', (req, res) => {
  const parentId = req.params.parentId;
  const query = `
    SELECT 
      r.id AS related_id,
      r.name,
      r.image,
      p.name AS product_name
    FROM relatedproducts r
    JOIN products p ON r.product_id = p.id
    WHERE r.product_id = ?
  `;

  db.query(query, [parentId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const relatedData = results.map(row => ({
      id: row.related_id,
      name: row.name,
      imageUrl: row.image ? `data:image/jpeg;base64,${row.image.toString('base64')}` : '',
    }));
    res.json(relatedData);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
