var express = require('express');
var router = express.Router();
const User = require('./User');

router.get('/', function (req, res) {
    return res.json({page: Home});
});

router.post('/login', function (req, res) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return res.redirect('/notFound'); // TODO: handle errors in login.
        } else {          
          return res.json(user);
        }
      });
});

router.post('/signup', (req, res) => {
    const newUser = req.body;

    User.findOne({email: newUser.email}, function(error, user) {
        if (error) {
            // Error        
        } else if (user !== null) {            
            return res.json({message: 'User already exist.'});
        } else {
            User.create(newUser, function (error, newUser) {
                if (error) {
                    console.log(error.message);
                } else {
                    console.log("New user was added to DB, taking him to his profile page.");
                    res.json({user: newUser});
                    res.redirect('/userProfile');
                }
            });            
        }
    });   
});

module.exports = router;