const mongoose       = require('mongoose');
const db = new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
}) 

module.exports = mongoose.model('db',db);