const mongoose = require("mongoose");
const db = require("../config/db.js").DBconnection;


const MsgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
       
    },
    query: {
        type: String,
       
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// const User = mongoose.model('User', UserSchema);
const Message = db.model('Message', MsgSchema);

module.exports = Message;
