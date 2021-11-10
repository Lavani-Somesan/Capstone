const e = require('express');
const { json } = require('body-parser');
const randToken = require('rand-token');

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
        console.log("User Service", req.path, "request", "Success, request successful", req.params.requestID, "\n");
    } else{
        console.log("User Service", req.path, "request", "Error, request not found", req.params.requestID, "\n");  
    }

    User.findOne({ username: req.body.username })
        .then(user => {
            let randomID = Math.floor((Math.random() * 100000) + 10000);

            if (user && user.password === req.body.password) {
                console.log("Successful in logging in\n");
                let payload = {
                    user: user,
                    responseID: randomID,
                    report: "Successful in logging in"
                };
                return res.json(payload);
            } 
            else {
                console.log("Unsuccessful in Logging in, No User Found\n");
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
            console.log(`Error doing authentication: ${error.message}\n`);
            return res.json(payload);
        });
};


exports.update_ApiToken = function(req, res) {

    User.findOneAndUpdate({ apiToken: req.params.token },{apiToken: randToken.generate(16)})
    .then(user => {

        user.save();

        let randomID = Math.floor((Math.random() * 100000) + 10000);

        if (user)  {
            console.log("Successfully Updated Token\n");
            let payload = {
                responseID: randomID,
                report: "Successfully Updated Token"
            };
            res.json(payload);
        }
        else {
            console.log("Unsuccessful in Changing Token\n");
            let payload = {
                responseID: randomID,
                report: "Error, Unsuccessful in Getting Profile Info"
            }
            return res.json(payload);
        }
    })
    .catch(error => {
        console.log(`Cannot Connect to Database: ${error.message}`);
            let payload = {
                responseID: randomID,
                report: "Error, Unsuccessful in Connecting To  Database"
            }
            res.json(payload);
    });

};