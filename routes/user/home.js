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

  console.log(teamData);
  res.render('user/home',{teamData, teamCount : teamData[0].count, playerCount : playerCount.count});
});

module.exports = router;
