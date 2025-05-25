
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
      imageUrl: row.image ? `data:image/jpeg;base64,${row.image.toString('base64')}` : ''
    }));
    res.json(relatedData);
  });
});
