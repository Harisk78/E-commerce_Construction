app.post('/register', (req, res) => {
  const { username, password, phone } = req.body;
  db.query('INSERT INTO user_details (username, password, phone) VALUES (?, ?, ?)', [username, password, phone], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error registering user' });
    res.status(200).json({ message: 'User registered successfully', userId: result.insertId });
  });
});
