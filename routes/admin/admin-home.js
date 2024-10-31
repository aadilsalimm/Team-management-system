var express = require('express');
var router = express.Router();
const db = require('../../dbConnect');
const isAuthenticated = require('../../authenticate');
const {adminName} = require('./login');

router.use(isAuthenticated);



router.get('/', (req, res) => {
    const adminData = req.session.admin;
    var teamInfo;

    db.get('SELECT team_name FROM Teams WHERE team_id = ?',[adminData.teamID], (err,data) => {
        teamInfo = data.teamName;
    })

    db.all('SELECT count(player_id) AS count, player_name, role FROM Players WHERE team = ?', [adminData.teamID], (err,data) => {
        if(err) {
            return res.status(500).json({ error: 'Server error' });
        }

        res.render('admin/admin-home',{adminData,teamInfo,data});
    });
    
});

module.exports = router;
