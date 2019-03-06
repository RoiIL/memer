var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    return res.json({page: Home});
});

router.get('/LogIn', function (req, res) {
    return res.json({message: 'LogIn Page'});
});

module.exports = router;