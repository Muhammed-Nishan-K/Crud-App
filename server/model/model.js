const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    pass:String,
    gender: String,
    status: String
});

const userDb = mongoose.model("userdb", schema);

module.exports = userDb;
