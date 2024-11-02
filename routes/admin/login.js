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
        return res.render('error',{ message : 'Username and password are required' , returnRoute : '/admin'});
    }

    // Find user
    db.get('SELECT * FROM Admins WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.render('error',{ message : 'Server error', returnRoute : '/admin' });
        }
        if (!user) {
            return res.render('error',{message : 'Invalid credentials', returnRoute : '/admin'});
        }

        // Check password
        const validPassword = (password === user.password);
        if (!validPassword) {
            return res.render('error',{message : 'Invalid credentials', returnRoute : '/admin'});
        }

        req.session.admin = {
            username: user.username,
            adminName: user.admin_name,
            teamID: user.Team,
        };
        res.redirect('/admin-home');
    });
});

//Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.render('error',{message : 'Error Logging out', returnRoute : '/admin-home'});
        }
        res.redirect('/admin');
    });
});

module.exports = router;