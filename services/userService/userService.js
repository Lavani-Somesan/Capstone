const e = require('express');
const { json } = require('body-parser');
const randToken = require('rand-token');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    

    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        birthday: req.body.birthday,
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, saltRounds)
    })
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
            var report_1 = ""

            if(error.message.includes("username")) {
                report_1 = "Error, Username is Already Taken!";
            } 
            else if(error.message.includes("email")) {
                report_1 = "Error, Email is Already Taken!";
            } else {
                report_1 = "Error, Unsucessful Creation of User"
            }
            user = 0;
                let payload = {
                    user: user,
                    responseID: randID,
                    report: report_1
                }
            res.json(payload);
        });
};


exports.authenticate = async function(req, res) {

    if(req != null){
        console.log("User Service", req.path, "request", "Success, request successful", req.params.requestID, "\n");
    } else{
        console.log("User Service", req.path, "request", "Error, request not found", req.params.requestID, "\n");  
    }

    let randomID = Math.floor((Math.random() * 100000) + 10000);

    const user = await User.findOne({ username: req.body.username });

    if(user) {
        const comparePswrd = await bcrypt.compare(req.body.password, user.password);

        if(comparePswrd) {
            console.log("Successful in logging in\n");
            let payload = {
                user: user,
                responseID: randomID,
                report: "Successful in logging in"
            };
            return res.json(payload);
        } else {
            console.log("Error, Username or Password Incorrect\n");
                let payload = {
                    user: 0,
                    responseID: randomID,
                    report: "Error, Username or Password Incorrect"
                }
                return res.json(payload);
        } 
    } else {
            let payload = {
                user: 0,
                responseID: randomID,
                report: "Error, Unsuccessful in Logging in"
            }
            console.log(`Error doing authentication:\n`);
            return res.json(payload);
    }
};


exports.changePassword = async function(req, res) {

    let randomID = Math.floor((Math.random() * 100000) + 10000);

    const user = await User.findOne({ apiToken: req.params.token});

    if(user) {
        const comparePswrd = await bcrypt.compare(req.body.current_password, user.password);

        console.log(comparePswrd + "\n");

        if(comparePswrd) {
            
            const newHashedPswrd = await bcrypt.hash(req.body.new_password, saltRounds);
    
            const passwordUpdate = await User.findOneAndUpdate({ apiToken: req.params.token },{password: newHashedPswrd});
            
            if(passwordUpdate) {
                console.log("Successfully Changed Password\n");
                let payload = {
                    responseID: randomID,
                    report: "Successfully Changed Password"
                };
                res.json(payload);
            } 
            else {
                console.log("Error, Unable To Change Password Currently\n");
                let payload = {
                    responseID: randomID,
                    report: "Error, Unable To Change Password Currently"
                };
                return res.json(payload);
            }     
        } else {
        console.log("Error, Your Current Password Was Entered Incorrectly, Please Try Again\n");
            let payload = {
                responseID: randomID,
                report: "Error, Your Current Password Was Entered Incorrectly, Please Try Again"
            };
            return res.json(payload);
         }
        
    }
    
    else {
    console.log("Error, Unable To Change Password Currently\n");
    let payload = {
        responseID: randomID,
        report: "Error, Unable To Change Password Currently"
    };
    return res.json(payload);
}
    
};


exports.updateEmail = async function(req, res) {

    let randomID = Math.floor((Math.random() * 100000) + 10000);


    const match_email = await User.findOne({email: req.body.new_email});

    if(match_email) {
        console.log("Error, Email is Already Taken\n");
        let payload = {
            responseID: randomID,
            report: "Error Email is Already Taken"
        };
        res.json(payload);
    } 

    else {
        const emailUpdate = await User.findOneAndUpdate({apiToken: req.params.token, email: req.body.current_email}, {email: req.body.new_email});

        emailUpdate.save();

        if(emailUpdate) {
            console.log("Successfully Updated Email\n");
            let payload = {
                responseID: randomID,
                report: "Successfully Updated Email"
            };
            res.json(payload);
        } 
        else {
            console.log("Error in Updating Email, Please Try Again\n");
            let payload = {
                responseID: randomID,
                report: "Error in Updating Email, Please Try Again"
            };
            res.json(payload);
        }
    }
};


exports.updateName = async function(req, res) {
    let randomID = Math.floor((Math.random() * 100000) + 10000);

    const user_name = await User.findOneAndUpdate({apiToken: req.params.token}, {firstname: req.body.firstname, lastname: req.body.lastname});

    user_name.save();

    if(user_name) {
        console.log("Successfully Updated First & Last Name\n");
        let payload = {
            responseID: randomID,
            report: "Successfully Updated First & Last Name"
        };
        res.json(payload);
    }
    else {
        console.log("Error, Unable to Update First & Last Name\n");
        let payload = {
            responseID: randomID,
            report: "Error, Unable to Update First & Last Name"
        };
        res.json(payload);
    }
};


exports.updateBday = async function(req, res) {
    let randomID = Math.floor((Math.random() * 100000) + 10000);

    const user_bday = await User.findOneAndUpdate({apiToken: req.params.token}, {birthday: req.body.birthday});

    user_bday.save();

    if(user_bday) {
        console.log("Successfully Updated Birthday\n");
        let payload = {
            responseID: randomID,
            report: "Successfully Updated Birthday"
        };
        res.json(payload);
    }
    else {
        console.log("Error, Unable to Update Birthday\n");
        let payload = {
            responseID: randomID,
            report: "Error, Unable to Update Birthday"
        };
        res.json(payload);
    }
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
                report: "Error, Unsuccessful in Changing Token"
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

exports.getProfile = function(req,res)
{
    User.findOne({ apiToken: req.params.token })
    .then(user => {

        let randomID = Math.floor((Math.random() * 100000) + 10000);
        
        if (user)  {
            console.log("API Token Matched\n");
            let payload = {
                user : user,
                responseID: randomID,
                report: "Success, API Token Matched"
            };
            res.json(payload);
        }
        else {
            console.log("No API token found\n");
            let payload = {
                user : user,
                responseID: randomID,
                report: "Error, No API Token found"
            }
            res.json(payload);
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


exports.deleteAccount = async function(req, res) {

    let randomID = Math.floor((Math.random() * 100000) + 10000);

    const user = await User.findOne({apiToken: req.params.token});

    if(user) {
        const user_deleted = await User.findOneAndDelete({_id: user._id});

        if(user_deleted + "hih\n") {
            console.log(`Success, User has been Deleted`);
            let payload = {
                report: "Success, Account Deleted"
            }
            res.json(payload);
        }
        else {
            console.log(`Error, Unable To Delete User`);
            let payload = {
                report: "Error, Unable to Delete Account"
            }
            res.json(payload);
        }
    }
    else {
        console.log(`Error, Unable To Delete User`);
            let payload = {
                report: "Error, Unable to Delete Account"
            }
            res.json(payload);
    }

};