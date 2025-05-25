app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM user_details WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Login error' });
    if (results.length > 0) {
      const user = results[0];
      res.status(200).json({ message: 'Login successful', userId: user.id, username: user.username, phone: user.phone });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});
