var express = require('express');
var router = express.Router();
const User = require('./User');

router.get('/', function (req, res) {
    return res.json({page: Home});
});

router.get('/logIn', function (req, res) {
    return res.json({message: 'LogIn Page'});
});

router.post('/signUp', (req, res) => {
    const newUser = req.body;

    User.findOne({email: newUser.email}, function(error, user) {
        if (error) {
            // Error        
        } else if (user !== null) {            
            return res.json({message: 'User already exist.'});
        } else {
            User.create(newUser, function (error, user) {
                if (error) {
                    console.log(error.message);
                } else {
                    // New user was added to DB, take him to his profile page.
                }
            });            
        }
    });   
});

module.exports = router;