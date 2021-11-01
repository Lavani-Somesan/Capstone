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
            res.json(payload);
        });
};


exports.authenticate = function(req, res) {

    if(req != null){
        console.log("User Service", req.path, "request", "Success, request successful", req.params.requestID);
    } else{
        console.log("User Service", req.path, "request", "Error, request not found", req.params.requestID);  
    }

    User.findOne({ username: req.body.username })
        .then(user => {
            let randomID = Math.floor((Math.random() * 100000) + 10000);

            if (user && user.password === req.body.password) {
                console.log("Successful in logging in");
                let payload = {
                    user: user,
                    responseID: randomID,
                    report: "Successful in logging in"
                };
                return res.json(payload);
            } 
            else {
                console.log("Unsuccessful in Logging in, No User Found");
                user = 0;
                let payload = {
                    user: user,
                    responseID: randomID,
                    report: "Error, Unsuccessful in Logging in"
                }
                return res.json(payload);
            }
        })
        .catch(error => {
            user = 0;
            let payload = {
                user: user,
                responseID: randomID,
                report: "Error, Unsuccessful in Logging in"
            }
            console.log(`Error doing authentication: ${error.message}`);
            return res.json(payload);
        });
};