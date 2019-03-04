var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/About', function (req, res) {
    res.send('About Page');
});

module.exports = router;