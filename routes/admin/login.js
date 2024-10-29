var express = require('express');
var router = express.Router();
const db = require('../../dbConnect');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});

module.exports = router;