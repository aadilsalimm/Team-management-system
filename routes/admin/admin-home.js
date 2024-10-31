var express = require('express');
var router = express.Router();
const db = require('../../dbConnect');
const isAuthenticated = require('../../authenticate');
const {adminName} = require('./login');

router.use(isAuthenticated);



router.get('/', async(req, res) => {
    const adminData = req.session.admin;

    // Get team info
    const teamInfo = await new Promise((resolve, reject) => {
        db.get('SELECT team_name, captain_id FROM Teams WHERE team_id = ?', 
            [adminData.teamID], 
            (err, data) => {
                if (err) reject(err);
                else resolve(data);
            }
        );
    });

    // Modified query to get both player details and count
    const playerData = await new Promise((resolve, reject) => {
        db.all(`
            SELECT 
                player_name, 
                role,
                (SELECT COUNT(*) FROM Players WHERE team = ?) as count
            FROM Players 
            WHERE team = ?
        `, 
        [adminData.teamID, adminData.teamID], 
        (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });

    // Log the data to help with debugging
    //console.log('Team Info:', teamInfo);
    //console.log('Player Data:', playerData);

    res.render('admin/admin-home', { 
        adminData, 
        teamInfo, 
        playerData,
        playerCount: playerData.length > 0 ? playerData[0].count : 0
    });
    
});

module.exports = router;
