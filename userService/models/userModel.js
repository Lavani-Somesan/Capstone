const mongoose = require("mongoose");
const randToken = require("rand-token");
const userSchema = mongoose.Schema({
    
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", function(next) {
    let user = this;
    next();
});

module.exports = mongoose.model('Users', userSchema);