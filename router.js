var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/LogIn', function (req, res) {
    res.render('logIn');
});

module.exports = router;