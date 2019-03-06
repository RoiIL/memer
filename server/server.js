const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const User = require('./User');
const routes = require('./router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(3001, function () {
    console.log('Express app listening on port 3001');
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDb is connected!')
});  

let userData = {
    email: 'roi.ial@gmail.com',
    userName: 'roiial',
    password: '1234',
  }

User.findOne({email: userData.email}, function(error, user) {
    if (error) {
        // Error        
    } else if (user !== null) {
        console.log('User already exist.');
    } else {
        User.create(userData, function (error, user) {
            if (error) {
                // Handle error
            } else {
                // New user was added to DB, take him to his profile page.
            }
        });
        console.log(`User ${userDate.userName} was added.`)
    }
});

// let user = mongoose.model('User', userSchema);
// let newUser = new user({name: 'Roi'});
// newUser.save(function (err, newUser){
//     console.log(`User ${newUser.name} was saved.`)
// });


// user.deleteMany({name: 'Roi'}, function(error){
//     if (error) {
//         console.log(error);
//     }
//     else {
//         console.log('All users name Roi was removed');
//     }
// })