/*
 * Defines the Route Functionality of the
 * User Service
 */

const e = require('express');
const { json } = require('body-parser');
const randToken = require('rand-token');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');

let mongoose = require('mongoose'),
    User = mongoose.model('Users');


/*
 * Function to Create a User in DB
 * We can use the Mongoose .create to create the User 
 * with the information the user submitted.
 * The password is encrypted using bycrypt 
 * If user is created successfully returns payload containing user data
 * Otherwise, prints error message and returns payload that has no user data
 */      
exports.createUser = async function(req, res, next) {
    
    console.log("Success in transmission to userService", "request id: ", req.body.requestID);
    //console.log(req.body);

    let generateID = uuidv4();

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
                    responseID: generateID,
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
                let payload = {
                    user: 0,
                    responseID: generateID,
                    report: report_1
                }
            res.json(payload);
        });
};


/*
 * Function to Authenticate the User
 * First uses the Mongoose .findOne query to find a 
 * matching username that user submitted.
 * If match is found then the user's submitted password 
 * is encrypted and then compared with the found user objects
 * password. 
 * If both match then return payload with user's data 
 * else returns payload with no user's data and error message of why authentication failed.
 */   
exports.authenticate = async function(req, res) {

    console.log("Success in transmission to userService", "request id: ", req.body.requestID);

    let generateID = uuidv4();

    const user = await User.findOne({ username: req.body.username });

    if(user) {
        const comparePswrd = await bcrypt.compare(req.body.password, user.password);

        if(comparePswrd) {
            console.log("Successful in logging in\n");
            let payload = {
                user: user,
                responseID: generateID,
                report: "Successful in logging in"
            };
            return res.json(payload);
        } else {
            console.log("Error, Username or Password Incorrect\n");
                let payload = {
                    user: 0,
                    responseID: generateID,
                    report: "Error, Username or Password Incorrect"
                }
                return res.json(payload);
        } 
    } else {
            let payload = {
                user: 0,
                responseID: generateID,
                report: "Error, Unsuccessful in Logging in"
            }
            console.log(`Error doing authentication:\n`);
            return res.json(payload);
    }
};


/*
 * Function to Change User's Password
 * First ensure that api token matches stored one before changing any data.
 * If user object exists, then compare user's entered current password with user object stored password.
 * If match then encrypt new password and then update the User's password in DB using API token.
 * Returns payload with responseID and report regardless of success or error
 */ 
exports.changePassword = async function(req, res) {

    console.log("Success in transmission to userService", "request id: ", req.body.requestID);
    let generateID = uuidv4();

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
                    responseID: generateID,
                    report: "Successfully Changed Password"
                };
                res.json(payload);
            } 
            else {
                console.log("Error, Unable To Change Password Currently\n");
                let payload = {
                    responseID: generateID,
                    report: "Error, Unable To Change Password Currently"
                };
                return res.json(payload);
            }     
        } else {
        console.log("Error, Your Current Password Was Entered Incorrectly, Please Try Again\n");
            let payload = {
                responseID: generateID,
                report: "Error, Your Current Password Was Entered Incorrectly, Please Try Again"
            };
            return res.json(payload);
         }
        
    }
    
    else {
    console.log("Error, Unable To Change Password Currently\n");
    let payload = {
        responseID: generateID,
        report: "Error, Unable To Change Password Currently"
    };
    return res.json(payload);
}
    
};

/*
 * Function to Change User's Email
 * Finds a user with the user's current email in DB
 * If curr_email object exists, then find in DB a user with the new email.
 * If there is a user with the new email then returns an error.
 * Else, uses API toke to find the user and update the user's email address in DB with new email.
 * Returns payload with responseID and report regardless of success or error
 */ 
exports.updateEmail = async function(req, res) {

    console.log("Success in transmission to userService", "request id: ", req.body.requestID);

    let generateID = uuidv4();
    const curr_email = await User.findOne({email: req.body.current_email});

    if(!curr_email) {
        console.log("Error, Current Email Does Not Match\n");
        let payload = {
            responseID: generateID,
            report: "Error Current Email Does Not Match"
        };
        res.json(payload);
    }

    const match_email = await User.findOne({email: req.body.new_email});

    if(match_email) {
        console.log("Error, Email is Already Taken\n");
        let payload = {
            responseID: generateID,
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
                responseID: generateID,
                report: "Successfully Updated Email"
            };
            res.json(payload);
        } 
        else {
            console.log("Error in Updating Email, Please Try Again\n");
            let payload = {
                responseID: generateID,
                report: "Error in Updating Email, Please Try Again"
            };
            res.json(payload);
        }
    }
};


/*
 * Function to Upate User's Name
 * Uses the .findOneAndUpdate Mongoose query to find a user in the DB
 * with a matching API token and update the first name and last name.
 * Saves the updated user's info to DB
 * Returns a payload with a responseID and report regardless of success or error
 */ 
exports.updateName = async function(req, res) {

    console.log("Success in transmission to userService", "request id: ", req.body.requestID);

    let generateID = uuidv4();

    const user_name = await User.findOneAndUpdate({apiToken: req.params.token}, {firstname: req.body.firstname, lastname: req.body.lastname});

    user_name.save();

    if(user_name) {
        console.log("Successfully Updated First & Last Name\n");
        let payload = {
            responseID: generateID,
            report: "Successfully Updated First & Last Name"
        };
        res.json(payload);
    }
    else {
        console.log("Error, Unable to Update First & Last Name\n");
        let payload = {
            responseID: generateID,
            report: "Error, Unable to Update First & Last Name"
        };
        res.json(payload);
    }
};


/*
 * Function to Upate User's Birthday
 * Uses the .findOneAndUpdate Mongoose query to find a user in the DB
 * with a matching API token and update the user's birthday
 * Saves the updated user's info to DB
 * Returns a payload with a responseID and report regardless of success or error
 */ 
exports.updateBday = async function(req, res) {

    console.log("Success in transmission to userService", "request id: ", req.body.requestID);
    let generateID = uuidv4();

    const user_bday = await User.findOneAndUpdate({apiToken: req.params.token}, {birthday: req.body.birthday});

    user_bday.save();

    if(user_bday) {
        console.log("Successfully Updated Birthday\n");
        let payload = {
            responseID: generateID,
            report: "Successfully Updated Birthday"
        };
        res.json(payload);
    }
    else {
        console.log("Error, Unable to Update Birthday\n");
        let payload = {
            responseID: generateID,
            report: "Error, Unable to Update Birthday"
        };
        res.json(payload);
    }
};



/*
 * Function to Upate API Token
 * Uses the .findOneAndUpdate Mongoose query to find a user in the DB
 * with a matching API token and update generate a new random token.
 * Saves the updated user's info to DB
 * Returns a payload with a responseID and report regardless of success or error
 */ 
exports.update_ApiToken = function(req, res) {

    User.findOneAndUpdate({ apiToken: req.params.token },{apiToken: randToken.generate(16)})
    .then(user => {

        user.save();

        let generateID = uuidv4();

        if (user)  {
            console.log("Successfully Updated Token\n");
            let payload = {
                responseID: generateID,
                report: "Successfully Updated Token"
            };
            res.json(payload);
        }
        else {
            console.log("Unsuccessful in Changing Token\n");
            let payload = {
                responseID: generateID,
                report: "Error, Unsuccessful in Changing Token"
            }
            return res.json(payload);
        }
    })
    .catch(error => {
        console.log(`Cannot Connect to Database: ${error.message}`);
            let payload = {
                responseID: generateID,
                report: "Error, Unsuccessful in Connecting To  Database"
            }
            res.json(payload);
    });

};


/*
 * Function to User's Info for Profile Page
 * Uses the .findOne Mongoose query to find a user in the DB
 * with a matching API token and returns the payload with the
 * user's data.
 * If no user is found, then returns payload with no user data.
 */ 
exports.getProfile = function(req,res)
{
    User.findOne({ apiToken: req.params.token })
    .then(user => {

        let generateID = uuidv4();
        
        if (user)  {
            console.log("API Token Matched\n");
            let payload = {
                user : user,
                responseID: generateID,
                report: "Success, API Token Matched"
            };
            res.json(payload);
        }
        else {
            console.log("No API token found\n");
            let payload = {
                user : user,
                responseID: generateID,
                report: "Error, No API Token found"
            }
            res.json(payload);
        }
    })
    .catch(error => {
        console.log(`Cannot Connect to Database: ${error.message}`);
            let payload = {
                responseID: generateID,
                report: "Error, Unsuccessful in Connecting To  Database"
            }
            res.json(payload);
    });
};


/*
 * Function to Delete a User's Account
 * Users the .find Mongoose query to find a user in the DB with a matching
 * API token.
 * If user exists, then do .findOneAndDelete query using the object id 
 * of the user found to delete the user from the DB.
 * Returns a payload with a responseID and report regardless of success or error
 */ 
exports.deleteAccount = async function(req, res) {

    let generateID = uuidv4();

    const user = await User.findOne({apiToken: req.params.token});

    if(user) {
        const user_deleted = await User.findOneAndDelete({_id: user._id});

        if(user_deleted + "hih\n") {
            console.log(`Success, User has been Deleted`);
            let payload = {
                responseID: generateID,
                report: "Success, Account Deleted"
            }
            res.json(payload);
        }
        else {
            console.log(`Error, Unable To Delete User`);
            let payload = {
                responseID: generateID,
                report: "Error, Unable to Delete Account"
            }
            res.json(payload);
        }
    }
    else {
        console.log(`Error, Unable To Delete User`);
            let payload = {
                responseID: generateID,
                report: "Error, Unable to Delete Account"
            }
            res.json(payload);
    }

};