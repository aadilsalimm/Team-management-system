var express = require('express');
var router = express.Router();
const db = require('../../dbConnect');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});

// Login endpoint
router.post('/submit-login',(req, res) => {
    /*const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Set session
        req.session.userId = user.id;
        //res.json({ message: 'Logged in successfully', userId: user.id });

        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Server error' });
            }
            // 'rows' is an array of objects, where each object represents a row
            console.log(rows); // Example output: [{ id: 1, username: 'john' }, { id: 2, username: 'jane' }]
            //res.json(rows); // Send all rows as JSON

            res.render('admin/userList',{users : rows});
        });
        

        //res.render('admin/userList',rows);

    });*/
});


module.exports = router;