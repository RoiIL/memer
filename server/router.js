var express = require('express');
var router = express.Router();
const User = require('./User');
const jwt = require('jsonwebtoken');
const config = require('./config');
const bcrypt = require('bcrypt');
const verifyToken = require('./verifyToken');

router.post('/v1/login', function (req, res) {
    User.findOne({ email: req.body.email }, function (error, user) {
        if (error) {
            return res.status(500).send("Internal Server Error");
        } 
        if (!user) {
            return res.status(404).send("Wrong email or password.");
        }
        
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) { 
            return res.status(401).send("Wrong email or password.");
        }

        const token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        
        res.status(200).send({ authentication: true, token: token }); 
    });
});

router.post('/v1/signup', (req, res) => {
    const newUser = req.body;

    User.findOne({email: newUser.email}, function(error, user) {
        if (error) {                      
            return res.status(500).send("Internal Server Error");;        
        } 
        if (user) {         
            return res.status(422).send("The email: '" + newUser.email + "' is already registered.");
        } 
        
        const hashedPassword = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashedPassword;
        User.create(newUser, function (error, newUser) {
            if (error) {
                console.log(error.message);
                return res.status(500).send("There was a problem registering the user.");                
            } 
            console.log("New user was added to DB");
            const token = jwt.sign({id: newUser._id}, config.secret, {expiresIn: 86400 }); // Token expires in 24 hours
            return res.status(200).send({authentication: true, token: token});        
        });        
    });   
});

router.get('/v1/userProfile', verifyToken, (req, res, next) => {
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem finding the user.");
        }
        if (!user) {
            return res.status(404).send("No user found.");
        }

        res.status(200).send(user);
    });
});

router.get('*', function(req, res) {
    res.status(404).send('Ooops. Page not found!');
});

router.post('*', function(req, res) {
    res.status(501).send("Not Implemented. The 'POST' request is not implemented, did you mean to 'GET'?");
});

module.exports = router;