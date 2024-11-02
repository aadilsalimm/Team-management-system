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
    
    res.render('admin/update-form',{oldData, person: 'Player', route: '/admin-home/update-button-player'});
});

router.post('/update-button-player', async (req,res) => {
    const query = `UPDATE Players SET player_name = ?, role = ? WHERE player_id = ?`;
    //console.log(oldData.player_id + " " + req.body.name +" " + req.body.role);

    db.run(query,[req.body.name, req.body.role, oldData.player_id], (err) => {
        if(err) {
            return res.render('error',{message : 'Error updating user', returnRoute : '/admin-home'});
        }

        res.redirect('/admin-home');
    });
});

//Add player
var currentTeam;
router.get('/add-player', async (req,res) => {
    currentTeam = req.session.admin.teamID;
    res.render('admin/add-form', {person : 'Player', route : '/admin-home/add-button-player'});
})

router.post('/add-button-player', async (req,res) => {
    const query = `INSERT INTO Players (player_name, team, role) VALUES (?, ?, ?)`;
    
    db.run(query,[req.body.name, currentTeam, req.body.role], (err) => {
        if(err) {
            return res.render('error',{message : 'Error in adding player', returnRoute : '/admin-home'});
        }

        res.redirect('/admin-home');
    })
})

//Delete Player
router.post('/delete-player', async(req,res) => {
    if(req.body.id === req.body.captain) {
        return res.render('error',{message : 'Cannot delete Captain', returnRoute : '/admin-home'});
    }

    const query = `DELETE FROM Players WHERE player_id = ?`;
    db.run(query,[req.body.id], (err) => {
        if(err) {
            return res.render('error',{message : 'Error in deleting player', returnRoute : '/admin-home'});
        }

        res.redirect('/admin-home');
    })    
})


//add Staff
var currentTeam;
router.get('/add-staff', async (req,res) => {
    currentTeam = req.session.admin.teamID;
    res.render('admin/add-form', {person : 'Staff', route : '/admin-home/add-button-staff'});
})

router.post('/add-button-staff', async (req,res) => {
    const query = `INSERT INTO Supporting_staff (staff_name, role, team) VALUES (?, ?, ?)`;
    
    db.run(query,[req.body.name, req.body.role, currentTeam], (err) => {
        if(err) {
            return res.render('error',{message : 'Error in adding staff', returnRoute : '/admin-home'});
        }

        res.redirect('/admin-home');
    })
})

//Update staff
var oldData;
router.post('/edit-staff', async(req,res) => {
    oldData = {
        staff_id: req.body.id,
        name: req.body.name,
        role: req.body.role
    };
    //console.log(oldData);
    
    res.render('admin/update-form',{oldData, person: 'Staff', route: '/admin-home/update-button-staff'});
});

router.post('/update-button-staff', async (req,res) => {
    const query = `UPDATE Supporting_staff SET staff_name = ?, role = ? WHERE staff_id = ?`;
    //console.log(oldData.player_id + " " + req.body.name +" " + req.body.role);

    db.run(query,[req.body.name, req.body.role, oldData.staff_id], (err) => {
        if(err) {
            return res.render('error',{message : 'Error in updating staff', returnRoute : '/admin-home'});
        }

        res.redirect('/admin-home');
    });
});

//Delete Staff
router.post('/delete-staff', async(req,res) => {
    const query = `DELETE FROM Supporting_staff WHERE staff_id = ?`;
    db.run(query,[req.body.id], (err) => {
        if(err) {
            return res.render('error',{message : 'Error deleting staff', returnRoute : '/admin-home'});
        }

        res.redirect('/admin-home');
    });    
});

module.exports = router;
