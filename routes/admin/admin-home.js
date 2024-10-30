var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../authenticate');

router.use(isAuthenticated);

router.get('/', (req, res) => {
    res.render('admin/admin-home');
});

module.exports = router;
