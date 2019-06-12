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

    User.findOne({email: newUser.email}, function(error, user) {
        if (error) {                      
            return res.status(500).send("Internal Server Error");;        
        } else if (user !== null) {         
            return res.status(422).send("The email: '" + newUser.email + "' is already registered.");
        } else {
            User.create(newUser, function (error, newUser) {
                if (error) {
                    console.log(error.message);
                } else {
                    console.log("New user was added to DB");
                    return res.json({user: newUser});
                }
            });            
        }
    });   
});

router.get('*', function(req, res) {
    res.status(404).send('Ooops. Page not found!');
});

router.post('*', function(req, res) {
    res.status(501).send("Not Implemented. The 'POST' request is not implemented, did you mean to 'GET'?");
});

module.exports = router;