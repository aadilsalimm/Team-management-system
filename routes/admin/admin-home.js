var express = require('express');
var router = express.Router();
const db = require('../../dbConnect');
const isAuthenticated = require('../../authenticate');

router.use(isAuthenticated);



router.get('/', async(req, res) => {
    const adminData = req.session.admin;

    // Get team info
    const teamInfo = await new Promise((resolve, reject) => {
        db.get('SELECT team_name, player_name AS captain, captain_id FROM Teams,Players WHERE team_id = ? AND Teams.captain_id = Players.player_id', 
            [adminData.teamID], 
            (err, data) => {
                if (err) reject(err);
                else resolve(data);
            }
        );
    });
 
    // Getting player data
    const playerData = await new Promise((resolve, reject) => {
        db.all(`
            SELECT 
                *,
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

    //Getting Supporting staff data
    const supportingStaffData = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Supporting_staff WHERE team = ?`,[adminData.teamID], (err,data) => {
            if(err) reject (err);
            else resolve(data);
        })
    })

    res.render('admin/admin-home', { 
        adminData, 
        teamInfo, 
        playerData,
        playerCount: playerData.length > 0 ? playerData[0].count : 0,
        supportingStaffData
    });
    
});

//Edit player
var oldData;
router.post('/edit-player', async(req,res) => {
    oldData = {
        player_id: req.body.id,
        name: req.body.name,
        role: req.body.role
    };
    //console.log(oldData);
    
    res.render('admin/update-form',{oldData});
});

router.post('/update-button', async (req,res) => {
    const query = `UPDATE Players SET player_name = ?, role = ? WHERE player_id = ?`;
    //console.log(oldData.player_id + " " + req.body.name +" " + req.body.role);

    db.run(query,[req.body.name, req.body.role, oldData.player_id], (err) => {
        if(err) {
            return res.status(500).json({ error: 'Error updating user'});
        }

        res.redirect('/admin-home');
    });
});

//Add player
var currentTeam;
router.get('/add-player', async (req,res) => {
    currentTeam = req.session.admin.teamID;
    res.render('admin/add-form');
})

router.post('/add-button', async (req,res) => {
    const query = `INSERT INTO Players (player_name, team, role) VALUES (?, ?, ?)`;
    
    db.run(query,[req.body.name, currentTeam, req.body.role], (err) => {
        if(err) {
            return res.status(500).json({ error: 'Error updating user'});
        }

        res.redirect('/admin-home');
    })
})

//Delete User
router.post('/delete-player', async(req,res) => {
    if(req.body.id === req.body.captain) {
        return res.send('Cannot delete captain');
    }

    const query = `DELETE FROM Players WHERE player_id = ?`;
    db.run(query,[req.body.id], (err) => {
        if(err) {
            return res.status(500).json({ error: 'Error deleting user'});
        }

        res.redirect('/admin-home');
    })    
})


//add Staff
var currentTeam;
router.get('/add-staff', async (req,res) => {
    currentTeam = req.session.admin.teamID;
    res.render('admin/add-form');
})

router.post('/add-button', async (req,res) => {
    const query = `INSERT INTO Players (player_name, team, role) VALUES (?, ?, ?)`;
    
    db.run(query,[req.body.name, currentTeam, req.body.role], (err) => {
        if(err) {
            return res.status(500).json({ error: 'Error updating user'});
        }

        res.redirect('/admin-home');
    })
})
module.exports = router;
