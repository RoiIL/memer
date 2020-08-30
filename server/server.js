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
// mongoose.connect('mongodb://admin:Aw1deeee@localhost/memer');
mongoose.connect('mongodb://localhost/memer');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDb is connected!')
});

// const Mem = require('./Mem');
// let mem = new Mem({
//     url: 'https://memerbucket.s3.us-east-2.amazonaws.com/MemsImages/PHOTO-2019-04-11-13-21-56.jpg',
//     captions: [
//         {
//             userName: 'IR',
//             caption: "Who's next?",
//             likes: 20,
//         },
//         {
//             userName: 'Kornilyo',
//             caption: "You're lucky, I'm in good mood...",
//             likes: 30,
//         },
//         {
//             userName: 'Razi',
//             caption: "Sara I found it!",
//             likes: 132538,
//         }
//     ]
// })
// mem.save();
