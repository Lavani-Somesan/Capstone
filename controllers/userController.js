const apiAdapter = require('../api/apiAdapter');
const API_URL = process.env.API_ENDPOINT ||'http://localhost:2000';
const api = apiAdapter(API_URL);
const { v4: uuidv4 } = require('uuid');


exports.createUser = (req, res) => {

    req.body.requestID = uuidv4();
    let endPoint = API_URL + '/user' + req.path;
    
    console.log("Posting to API");
    
    api.post(endPoint, req.body).then(resp => {
        
        if(resp.data.responseID != null && !resp.data.report.includes("Error")) {
            console.log(`Success, Response ID: ${resp.data.responseID}`);
        } else {
            console.log(`Error, Response ID:  ${resp.data.responseID}`);
        }

        if(!resp.data.report.includes("Error")) {
            req.flash("success", "Success in Creating Account!")
            res.redirect("/login");
        } else {
            req.flash("error", resp.data.report);
            res.redirect("/create-account");
        }
    })
    .catch(error => {
        console.log("Error, Unable to Create an Account\n" + error.message);
        res.redirect("/create-account");
    });
    
};


exports.authentication = (req, res) => {
    req.body.requestID = uuidv4();
    let endPoint = API_URL + `/user/authentication/`;

    var isAuthenticated = 0;

    console.log("\n Posting login data to API");

    api.post(endPoint, req.body).then(resp => {
        const userObj = resp.data.user
            
        if(resp.data.responseID != null && resp.data.report != null){
            console.log("User Service", req.path, "response", resp.data.report, resp.data.responseID); 
        } 

        if (Object.keys(userObj).length > 0) {
            req.session.user_ApiToken = userObj.apiToken; //Starts session
            req.session.user_ID = userObj._id; 
            req.session.cartTotal = 0;

            req.flash("success", "Logged In Successfully!")
            res.redirect("/home");
        }
        else {
            console.log("User Not Found, Error Logging in\n");
            req.flash("error", resp.data.report);
            res.redirect("/login"); 
        }   
    })
    .catch(error => {
        console.log("Error, Unable to LogIn\n" + error.message);
        req.flash("error", "Failed to Log In");
        res.redirect("/login");
    })
};


exports.logout = (req, res) => {
    if (!req.session.user_ApiToken) {
        req.flash("error", "Not Logged In");
        res.redirect("/login");
    } else {
        //Change API Token
        this.update_ApiToken(req, res);

        //Destroys the user session
        req.session.destroy(error => {
            if (error) {
                console.log(`Could not Log Out: ${error.message}`);
                res.redirect("/home");
            } else {
                console.log("Logged out Successfully!\n")
                res.clearCookie('sid');
                res.redirect("/login");
            }
        });
    }
};

exports.update_ApiToken = (req, res) => {

    let endPoint = API_URL + `/apiToken/${req.session.user_ApiToken}`;
    
    console.log("Posting to API\n");
    
    api.get(endPoint).then(resp => {
        
        if(resp.data.responseID != null && !resp.data.report.includes("Error")) {
            console.log(`Success, Response ID: ${resp.data.responseID}`);
        } else {
            console.log(`Error, Response ID:  ${resp.data.responseID}`);
        }
    })
    .catch(error => {
        console.log("Error, Unable to Update API Token\n" + error.message);
    });


};

exports.getProfilePage =(req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash('error', "Please LogIn To View Profile");
        res.redirect('/login');
    } else {
        let endPoint = API_URL + `/user/profile/apiToken/${req.session.user_ApiToken}`;
    
        console.log("Posting to API\n");
        
        api.get(endPoint).then(resp => {

            const userObj = resp.data.user;

            if(resp.data.responseID != null && !resp.data.report.includes("Error")) {
                console.log(`Success, Response ID: ${resp.data.responseID}`);
            } else {
                console.log(`Error, Response ID:  ${resp.data.responseID}`);
            }
            
            if(userObj == 0)
            {
                req.flash("error", resp.data.report);
                res.redirect("/home");
            }
            else{
                res.render("profile", {session : req.session.user_ApiToken, data : userObj});
            }
        })
        .catch(error => {
            console.log("Error, Unable to Get Profile Page\n" + error.message);
            res.redirect("/home");
        });
    }
}


exports.getCartPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "LogIn to View Cart");
        res.redirect("/login");
    } else {
        res.render("cart", {session : req.session.user_ApiToken, data : req.session.cart, total : req.session.cartTotal});
    }
};


exports.addToCart = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Add Product to Cart");
        res.redirect("/login")
    } else {
        let endPoint = API_URL + req.path;

        console.log(endPoint);
        
        api.get(endPoint).then((response) => {

            if(response.data.product != 0) {
                req.session.cart.push(response.data);
                req.session.cartTotal  += response.data.price;

                res.redirect("/user/cart");
            } else  {
                req.flash("error", "Error Adding Item to Cart, Please Try Again");
                res.redirect("/home");
            }
          })
          .catch((error) => {
            console.log("Error, Unable to Add Product to Cart\n" + error.message);
            req.flash("error", "Error Product Cannot Be Added to Cart");
            res.redirect("/cart");
          });     
    }
};

exports.removeFromCart = (req, res) => {

    for(var i = 0; i < req.session.cart.length; i++) {

        if(req.params.id == req.session.cart[i]._id) {
            req.session.cartTotal -= req.session.cart[i].price;
            req.session.cart.splice(i, 1);   
        }
    }
    res.redirect("/user/cart");
};


exports.getAccountSettingsPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to View Your Account Settings ");
        res.redirect("/login")
    } else {
        res.render("accountSettings", {session : req.session.user_ApiToken});
    }
};


exports.getChangePasswordPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Change Your Password ");
        res.redirect("/login")
    } else {
        res.render("changePassword", {session : req.session.user_ApiToken});
    }
};


exports.changePassword = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Change Your Password ");
        res.redirect("/login")
    } else {
        let endPoint = API_URL + '/user' + req.path + `/${req.session.user_ApiToken}`;
        req.body.requestID = uuidv4();
        
        if(req.body.new_password == req.body.confirm_password) {

            api.post(endPoint, req.body).then((response) => {

                if(!response.data.report.includes("Error")) {
                    req.flash("success", response.data.report);
                    res.redirect("/user/profile");
                } else {
                    req.flash("error", response.data.report);
                    res.redirect("/user/account-settings/change-password");
                }

            })
            .catch((error) => {
                console.log("Error, Unable to Change Password\n" + error.message);
                req.flash("error", "Error, Unable to Change Password Currently");
                res.redirect("/user/account-settings");
              }); 
        } else {
                req.flash("error", "Your New Password Does Not Match Re-Entered Password");
                res.redirect("/user/account-settings/change-password");
        }        
    }
};


exports.getUpdateProfilePage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Update Your Profile");
        res.redirect("/login")
    } else {
        res.render("updateProfile", {session : req.session.user_ApiToken});
    }
};


exports.getUpdateEmailPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Update Your Email on Your Account");
        res.redirect("/login")
    } else {
        res.render("updateEmail", {session : req.session.user_ApiToken});
    }
};


exports.updateEmail = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Update Your Email ");
        res.redirect("/login")
    } else {
        console.log(req.body.new_email);
        console.log(req.body.current_email);
        if(req.body.new_email == req.body.confirm_email) {

            if(req.body.new_email != req.body.current_email) {

                let endPoint = API_URL + '/user' + req.path + `/${req.session.user_ApiToken}`;
                req.body.requestID = uuidv4();

                api.post(endPoint, req.body).then((response) => {

                    if(!response.data.report.includes("Error")) {
                        req.flash("success", response.data.report);
                        res.redirect("/user/profile");
                    } else {
                        req.flash("error", response.data.report);
                        res.redirect("/user/account-settings/update-profile/email");
                    }
    
                })
                .catch((error) => {
                    console.log("Error, Unable to Update Email\n" + error.message);
                    req.flash("error", "Error, Unable to Update Email Currently");
                    res.redirect("/user/account-settings");
                  }); 
            } 
            else {
                req.flash("error", "Your New Email is the Same as the Current Email");
                res.redirect("/user/account-settings/update-profile/email");
            }
        } 
        else {
                req.flash("error", "Your New Email Does Not Match Re-Entered Email");
                res.redirect("/user/account-settings/update-profile/email");
        }        
    }
};



exports.getUpdateNamePage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Update Your Name on Your Account");
        res.redirect("/login")
    } else {
        res.render("updateName", {session : req.session.user_ApiToken});
    }
};


exports.updateName = (req, res) => {

    let endPoint = API_URL + '/user' + req.path + `/${req.session.user_ApiToken}`;
    req.body.requestID = uuidv4();

    api.post(endPoint, req.body).then((response) => {

        if(!response.data.report.includes("Error")) {
            req.flash("success", response.data.report);
            res.redirect("/user/profile");
        } else {
            req.flash("error", response.data.report);
            res.redirect("/user/account-settings/update-profile/name");
        }
    })
    .catch((error) => {
        console.log("Error, Unable to Update Name\n" + error.message);
        req.flash("error", "Error, Unable to Update Name Currently");
        res.redirect("/user/account-settings");
      }); 
};


exports.getUpdateBdayPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Update Your Birthday on Your Account");
        res.redirect("/login")
    } else {
        res.render("updateBday", {session : req.session.user_ApiToken});
    }
};


exports.updateBday = (req, res) => {

    let endPoint = API_URL + '/user' + req.path + `/${req.session.user_ApiToken}`;
    req.body.requestID = uuidv4();

    api.post(endPoint, req.body).then((response) => {

        if(!response.data.report.includes("Error")) {
            req.flash("success", response.data.report);
            res.redirect("/user/profile");
        } else {
            req.flash("error", response.data.report);
            res.redirect("/user/account-settings/update-profile/birthday");
        }
    })
    .catch((error) => {
        console.log("Error, Unable to Update Birthday\n" + error.message);
        req.flash("error", "Error, Unable to Update Name Currently");
        res.redirect("/user/account-settings");
      }); 

};

exports.getDeleteAcntPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn if You Wish to Delete Your Account");
        res.redirect("/login")
    } else {
        res.render("deleteAcntPage", {session : req.session.user_ApiToken});
    }
}


exports.deleteAccount = (req, res) => {

    if(req.body.options == "yes") {

        if(req.body.option_check) {

            let endPoint = API_URL + '/user' + req.path + `/${req.session.user_ApiToken}`;
            req.body.requestID = uuidv4();

            api.post(endPoint, req.body).then((response) => {

                if(!response.data.report.includes("Error")) {
                    req.flash("success", response.data.report);
                    res.redirect("/user/logout");
                } else {
                    req.flash("error", response.data.report);
                    res.redirect("/user/account-settings/delete-account");
                }
            })
            .catch((error) => {
                console.log("Error with Deleting Account\n" + error.message)
                req.flash("error", "Error, Unable to Delete Account");
                res.redirect("/user/account-settings");
              }); 
              
        } else {
            req.flash('error', "Please also Check the Checkbox if you wish to Permanently Delete Your Account");
            res.redirect("/user/account-settings/delete-account");
        }

    } else {
        req.flash('error', "You have Selected No to Delete Your Account");
        res.redirect("/user/profile");
    }
};
