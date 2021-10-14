const e = require('express');
const { json } = require('body-parser');

let mongoose = require('mongoose'),
    User = mongoose.model('Users');



exports.createUser = async function(req, res, next) {
    if(req != null){
        console.log("Success in transmission to userService");
        console.log(req.body);
    } else{
        console.log("Error in transmission");
    }
    let randID = Math.floor((Math.random() * 100000) + 10000);

    User.create(req.body)
        .then(user => {
            
            console.log("User added");
                let payload = {
                    user: user,
                    responseID: randID,
                    report: "User Added Successfully"
                };
            res.json(payload);
        })
        .catch(error => {
            console.log(`Error Creating User: ${error.message}`);
            user = 0;
                let payload = {
                    user: user,
                    responseID: randID,
                    report: "Error, Unsuccessful Creation of User"
                }
                return res.json(payload);
        });
};