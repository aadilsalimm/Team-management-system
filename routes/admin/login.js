var express = require('express');
var router = express.Router();
const db = require('../../dbConnect');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});

// Login endpoint
router.post('/submit-login',(req, res) => {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user
    db.get('SELECT * FROM Admins WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const validPassword = (password === user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Set session
        //req.session.userId = user.id;

        //res.render('dfd/userList',rows);
        //res.send('login success');
        //res.redirect('/admin-home');

        req.session.admin = { username: req.body.username }; // Set the session
        res.redirect('/admin-home');
        //res.redirect('/admin'); // Redirect back if login fails

    });
});


module.exports = router;