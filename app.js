const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./User');
const routes = require('./router');

app.use('/', routes);
app.listen(3000, function () {
    console.log('Express app listening on port 3000');
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/test');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDb is connected!')
});  

app.set('view engine', 'pug');

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