var express = require('express');
var router = express.Router();
const db = require('../../dbConnect');

/* GET home page. */
router.get('/', async function(req, res, next) {

  const teamData = await new Promise( (resolve,reject) => {
    db.all(`SELECT * , (SELECT COUNT(*) FROM Teams) AS count FROM Teams`, (err,data) => {
      if(err)
        reject(err);
      else
        resolve(data);
    })
  });

  const playerCount = await new Promise( (resolve,reject) => {
    db.get('SELECT COUNT(*) AS count FROM Players', (err,data) => {
      if(err)
        reject(err);
      else 
        resolve(data);
    })
  });

  //console.log(teamData);
  res.render('user/home',{teamData, teamCount : teamData[0].count, playerCount : playerCount.count});
});

//Team-Profile
router.post('/team', async(req,res) => {
  const teamInfo = await new Promise((resolve, reject) => {
    db.get('SELECT team_name, player_name AS captain FROM Teams,Players WHERE team_id = ? AND Teams.captain_id = Players.player_id', 
        [req.body.id], 
        (err, data) => {
            if (err) reject(err);
            else resolve(data);
        }
    );
  });

  const playerData = await new Promise((resolve, reject) => {
    db.all(`
        SELECT 
            *,
            (SELECT COUNT(*) FROM Players WHERE team = ?) as count
        FROM Players 
        WHERE team = ?
        `, 
      [req.body.id, req.body.id], 
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
    });
  });

  //Get name of coach
  const coachName = await new Promise((resolve,reject) => {
    db.get(`SELECT staff_name FROM Supporting_staff WHERE role = 'Coach' AND team = ?`, [req.body.id], (err,data) => {
        if(err) reject(err);
        else resolve(data);
    })
  })

  const supportingStaffData = await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM Supporting_staff WHERE team = ?`,[req.body.id], (err,data) => {
        if(err) reject (err);
        else resolve(data);
    })
  })

  res.render('user/team-profile', {teamInfo, playerData, playerCount : playerData[0].count, supportingStaffData,coachName});
});

module.exports = router;
