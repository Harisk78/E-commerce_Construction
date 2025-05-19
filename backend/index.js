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

app.get('/product-names', (req, res) => {
  db.query('SELECT DISTINCT name FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results.map(row => row.name));
  });
});

app.get('/products/parents', (req, res) => {
  db.query('SELECT id, name FROM products WHERE parent_id IS NULL', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

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

app.get('/products/:parentId/name', (req, res) => {
  const parentId = req.params.parentId;
  db.query('SELECT name FROM products WHERE id = ?', [parentId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });

    res.json({ name: results[0].name });
  });
});

// ✅ New endpoint to get joined data from `children` and `products`
app.get('/joined-children', (req, res) => {
  const query = `
    SELECT 
      c.id AS child_id,
      c.name AS child_name,
      c.image AS child_image,
      p.id AS parent_id,
      p.name AS parent_name,
      p.image AS parent_image
    FROM children c
    JOIN products p ON c.parent_id = p.id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const joinedData = results.map(row => ({
      childId: row.child_id,
      childName: row.child_name,
      childImageUrl: `data:image/jpeg;base64,${row.child_image.toString('base64')}`,
      parentId: row.parent_id,
      parentName: row.parent_name,
      parentImageUrl: `data:image/jpeg;base64,${row.parent_image.toString('base64')}`,
    }));

    res.json(joinedData);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
