const db = require('../db/database');

exports.register = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
        if (err) {
            return res.status(400).json({ error: 'User already exists or DB error.' });
        }
        res.json({ message: 'Registered successfully!' });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        if (!row) return res.status(401).json({ error: 'Invalid credentials.' });
        req.session.user = row;
        res.json({ message: 'Login successful!' });
    });
};
