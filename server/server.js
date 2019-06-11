const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const routes = require('./router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(3001, function () {
    console.log('Express app listening on port 3001');
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://admin:Aw1deeee@localhost/memer');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDb is connected!')
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