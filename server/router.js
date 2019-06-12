var express = require('express');
var router = express.Router();
const User = require('./User');

router.post('/v1/login', function (req, res) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
          let err = new Error();
          err.status = 401;
          err.message = 'Wrong email or password.';
          return res.json(err); // TODO: handle errors in login.
        } else {          
          return res.json(user);
        }
      });
});

router.post('/v1/signup', (req, res) => {
    const newUser = req.body;
    let err = new Error();

    User.findOne({email: newUser.email}, function(error, user) {
        if (error) {            
            err.status = 500;
            err.message = 'Unhandeled';           
            return res.json(err);        
        } else if (user !== null) {
            err.status = 400;
            err.message = 'User already exist.';             
            return res.json(err);
        } else {
            User.create(newUser, function (error, newUser) {
                if (error) {
                    console.log(error.message);
                } else {
                    console.log("New user was added to DB, taking him to his profile page.");
                    return res.json({user: newUser});
                }
            });            
        }
    });   
});

router.get('*', function(req, res) {
    res.status(404).send('Ooops. Page not found!');
});

module.exports = router;