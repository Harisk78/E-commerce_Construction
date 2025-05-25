// index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

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

// PRODUCTS
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post('/products', (req, res) => {
  const { name, image } = req.body;
  db.query('INSERT INTO products (name, image) VALUES (?, ?)', [name, image], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.put('/products/:id', (req, res) => {
  const { name, image } = req.body;
  db.query('UPDATE products SET name = ?, image = ? WHERE id = ?', [name, image, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.delete('/products/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.get('/products/:id/name', (req, res) => {
  const id = req.params.id;
  db.query('SELECT name FROM products WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(results[0]);
  });
});


// RELATED PRODUCTS
app.get('/relatedproducts/:parentid', (req, res) => {
  const parentId = req.params.parentid;
  db.query('SELECT rp.*, p.name as parent_name FROM relatedproducts rp LEFT JOIN products p ON rp.parent_id = p.id', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post('/relatedproducts', (req, res) => {
  const { name, image, parent_id } = req.body;
  db.query('INSERT INTO relatedproducts (name, image, parent_id) VALUES (?, ?, ?)', [name, image, parent_id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.put('/relatedproducts/:id', (req, res) => {
  const { name, image, parent_id } = req.body;
  db.query('UPDATE relatedproducts SET name = ?, image = ?, parent_id = ? WHERE id = ?', [name, image, parent_id, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.delete('/relatedproducts/:id', (req, res) => {
  db.query('DELETE FROM relatedproducts WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// USERS
app.get('/users', (req, res) => {
  db.query('SELECT * FROM user_details', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post('/users', (req, res) => {
  const { username, password, phone } = req.body;
  db.query('INSERT INTO user_details (username, password, phone) VALUES (?, ?, ?)', [username, password, phone], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.put('/users/:id', (req, res) => {
  const { username, password, phone } = req.body;
  db.query('UPDATE user_details SET username = ?, password = ?, phone = ? WHERE id = ?', [username, password, phone, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.delete('/users/:id', (req, res) => {
  db.query('DELETE FROM user_details WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// USER REQUESTS
app.get('/requests', (req, res) => {
  db.query('SELECT r.id, r.product, r.quantity, u.username FROM user_request r JOIN user_details u ON r.user_id = u.id', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post('/requests', (req, res) => {
  const { product, quantity, username, phone } = req.body;

  db.query('SELECT id FROM user_details WHERE username = ? AND phone = ?', [username, phone], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const userId = results[0].id;
    db.query('INSERT INTO user_request (product, quantity, user_id) VALUES (?, ?, ?)', [product, quantity, userId], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true });
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
