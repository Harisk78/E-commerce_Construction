// ✅ Get all products
app.get('/products', (req, res) => {
  db.query('SELECT id, name, image FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const products = results.map(row => ({
      id: row.id,
      name: row.name,
      imageUrl: `data:image/jpeg;base64,${row.image.toString('base64')}`
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
      imageUrl: `data:image/jpeg;base64,${row.image.toString('base64')}`
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
