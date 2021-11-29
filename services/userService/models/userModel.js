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
        unique: true,
        required: true
    },

    birthday: {
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
    },

    apiToken: {
        type: String
    }
});

userSchema.pre("save", function(next) {
    let user = this;
    if (!user.apiToken) user.apiToken = randToken.generate(16);
    next();
});

module.exports = mongoose.model('Users', userSchema);