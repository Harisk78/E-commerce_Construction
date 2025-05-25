// ✅ Create user_cart table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS user_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    product_name VARCHAR(255),
    quantity INT,
    image LONGBLOB
  )
`);

// 🔁 Add-to-cart endpoint
app.post('/add-to-cart', (req, res) => {
  const { userId, productId, productName, quantity, image } = req.body;

  const imageBuffer = image?.includes(',') ? Buffer.from(image.split(',')[1], 'base64') : null;

  const query = `
    INSERT INTO user_cart (user_id, product_id, product_name, quantity, image)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [userId, productId, productName, quantity, imageBuffer], (err, result) => {
    if (err) {
      console.error('Error inserting into cart:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Item added to cart' });
  });
});