const mongoose = require('mongoose');

const MemSchema = new mongoose.Schema({
    url: {
        type: String,
        unique: true,
        required: true,
    },
    captions: [
        {
            userName: String,
            caption: String,
            likes: Number
        }
    ]
});
  
const Mem = mongoose.model('Mem', MemSchema);
module.exports = Mem;