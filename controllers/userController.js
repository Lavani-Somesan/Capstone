/*
 * userController.js
 * Defines the Different User Route Functionality 
 */

const apiAdapter = require('../api/apiAdapter');
const API_URL = process.env.API_ENDPOINT ||'http://localhost:2000';
const api = apiAdapter(API_URL);
const { v4: uuidv4 } = require('uuid');


/*
 * Function to Create an Account
 * Makes a post request to the API and awaits a response.
 * If the userObj contains data then it will flash success and redirect to login
 * Else it will flash an error as to why cannot create account and redirect back to
 * the create account page
 */
exports.createUser = (req, res) => {

    req.body.requestID = uuidv4();
    let endPoint = API_URL + '/user' + req.path;
    
    console.log("Posting to API");
    
    api.post(endPoint, req.body).then(resp => {
        const userObj = resp.data.user;
        
        if(resp.data.responseID != null && !resp.data.report.includes("Error")) {
            console.log(`Success, Response ID: ${resp.data.responseID}`);
        } else {
            console.log(`Error, Response ID:  ${resp.data.responseID}`);
        }

        if(userObj) {
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


/*
 * Function to Authenticate a User when Logging in
 * Makes a post request to the API and awaits a response.
 * If the userObj contains data it will start a session and then redirect logged-in user to home page.
 * Else it will flash an error as to why they cannot login and redirect back to
 * the login page
 */
exports.authentication = (req, res) => {
    req.body.requestID = uuidv4();
    let endPoint = API_URL + `/user/authentication/`;

    var isAuthenticated = 0;

    console.log("\n Posting login data to API");

    api.post(endPoint, req.body).then(resp => {
        const userObj = resp.data.user
            
        console.log("User Service", req.path, "response", resp.data.report, resp.data.responseID); 
        
        if (userObj) {
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


/*
 * Function to LogOut a User from their Account
 * If the user is not logged in (in a session) they will not be able to logout
 * Otherwise, the user's API token is updated before the session is destroyed.
 * If session is destroyed successfully the cookie will be cleared and user will be redirected to login.
 * If there is an error, the user will be reidrected to home and given an error message.
 */
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


/*
 * Function to Update a User's API Token
 * Makes a get request to the API and awaits a response
 * Prints either a success or error message depending on if token was updated.
 */
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


/*
 * Function to Get the User's Profile Page
 * If the user is not logged in (in a session) they will be redirected to login to view profile page.
 * Otherwise, makes a get request to the API and awaits a response
 * If the userObj contains data it will render the profile page with the data
 * Else it will flash an error as to why they cannot view the profile page and redirect to home page
 */
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
            
            if(userObj) {
                res.render("profile", {session : req.session.user_ApiToken, data : userObj});
            }
            else {
                req.flash("error", resp.data.report);
                res.redirect("/home");
            }
        })
        .catch(error => {
            console.log("Error, Unable to Get Profile Page\n" + error.message);
            res.redirect("/home");
        });
    }
}


/*
 * Function to Get the User's Cart Page
 * If the user is not logged in (in a session) they will be redirected to login to view the cart page.
 * Otherwise, the cart page is rendered with the current items that have been added to the session cart.
 */
exports.getCartPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "LogIn to View Cart");
        res.redirect("/login");
    } else {
        res.render("cart", {session : req.session.user_ApiToken, data : req.session.cart, total : req.session.cartTotal});
    }
};


/*
 * Function to Add to the User's Cart
 * If the user is not logged in (in a session) they will be redirected to login to add to cart.
 * Otherwise, makes a get request to the API and awaits a response
 * If the productObj contains data it will add the product to the session cart
 * and update the session cart total.
 * Else it will flash an error as to why they cannot add product to cart and redirect to home page
 */
exports.addToCart = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Add Product to Cart");
        res.redirect("/login")
    } else {
        let endPoint = API_URL + req.path;

        console.log(endPoint);
        
        api.get(endPoint).then((response) => {
            const productObj = response.data;

            if(productObj) {
                req.session.cart.push(productObj);
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


/*
 * Function to Remove Item From User's Cart
 * Loops through the session cart and finds the matching product id
 * that the user wants to remove and splices it from the cart.
 * Redirects back to the cart page with the updated data.
 */
exports.removeFromCart = (req, res) => {

    for(var i = 0; i < req.session.cart.length; i++) {

        if(req.params.id == req.session.cart[i]._id) {
            req.session.cartTotal -= req.session.cart[i].price;
            req.session.cart.splice(i, 1);   
        }
    }
    res.redirect("/user/cart");
};


/*
 * Function to Get User's Account Settings Page
 * If the user is not logged in (in a session) they will be redirected to login to view account settings page.
 * Otherwise, the Account Settings page will render
 */
exports.getAccountSettingsPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to View Your Account Settings ");
        res.redirect("/login")
    } else {
        res.render("accountSettings", {session : req.session.user_ApiToken});
    }
};


/*
 * Function to Get the User's Change Password Page
 * If the user is not logged in (in a session) they will be redirected to login to view change password page.
 * Otherwise, renders Change Password page
 */
exports.getChangePasswordPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Change Your Password ");
        res.redirect("/login")
    } else {
        res.render("changePassword", {session : req.session.user_ApiToken});
    }
};


/*
 * Function to Change a User's Password
 * If the user is not logged in (in a session) they will be redirected to login to change their password.
 * If the new password does not equal re-entered new password then user is redirected back to change password page. 
 * Otherwise, makes a post request to the API and awaits a response.
 * If the response report does not contain "Error" then the password was updated successfully
 * and redirect to profile page.
 * Else it will flash an error as to why they cannot change password and redirect back to change password page
 */
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


/*
 * Function to Get the User's Update Profile Page
 * If the user is not logged in (in a session) they will be redirected to login to view update profile page.
 * Otherwise, renders Update Profile Page
 */
exports.getUpdateProfilePage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Update Your Profile");
        res.redirect("/login")
    } else {
        res.render("updateProfile", {session : req.session.user_ApiToken});
    }
};


/*
 * Function to Get the Update User's Email Page
 * If the user is not logged in (in a session) they will be redirected to login to view the update email page.
 * Otherwise, renders the Update Email page
 */
exports.getUpdateEmailPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Update Your Email on Your Account");
        res.redirect("/login")
    } else {
        res.render("updateEmail", {session : req.session.user_ApiToken});
    }
};


/*
 * Function to Update a User's Email
 * If the user is not logged in (in a session) they will be redirected to login to update their email
 * If the new email does not equal re-entered new email or if current email equals new email
 * then user is redirected back to update email page.
 * Otherwise, makes a post request to the API and awaits a response.
 * If the response report does not contain "Error" then the email was updated successfully
 * and redirect to profile page.
 * Else it will flash an error as to why they cannot update the email and redirect back to update email page
 */
exports.updateEmail = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Update Your Email ");
        res.redirect("/login")
    } else {

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


/*
 * Function to Get the Update User's Name Page
 * If the user is not logged in (in a session) they will be redirected to login to view the update name page.
 * Otherwise, renders the Update Name page
 */
exports.getUpdateNamePage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Update Your Name on Your Account");
        res.redirect("/login")
    } else {
        res.render("updateName", {session : req.session.user_ApiToken});
    }
};


/*
 * Function to Update a User's Name
 * If the user is not logged in (in a session) they will be redirected to login to update their name
 * Makes a post request to the API and awaits a response.
 * If the response report does not contain "Error" then the name was updated successfully
 * and redirect to profile page.
 * Else it will flash an error as to why they cannot update the name and redirect back to update name page
 */
exports.updateName = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Update Your Name ");
        res.redirect("/login")
    } else {
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
    }
};


/*
 * Function to Get the Update User's Birthday Page
 * If the user is not logged in (in a session) they will be redirected to login to view the update birthday page.
 * Otherwise, renders the Update Birthday page
 */
exports.getUpdateBdayPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Update Your Birthday on Your Account");
        res.redirect("/login")
    } else {
        res.render("updateBday", {session : req.session.user_ApiToken});
    }
};



/*
 * Function to Update a User's Birthday
 * If the user is not logged in (in a session) they will be redirected to login to update their birthday
 * Makes a post request to the API and awaits a response.
 * If the response report does not contain "Error" then the birthday was updated successfully
 * and redirect to profile page.
 * Else it will flash an error as to why they cannot update the name and redirect back to update birthday page
 */
exports.updateBday = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn to Update Your Birthday ");
        res.redirect("/login")
    } else {
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
    }

};


/*
 * Function to Get the Delete User's Account Page
 * If the user is not logged in (in a session) they will be redirected to login to view the delete account page.
 * Otherwise, renders the Delete Account page
 */
exports.getDeleteAcntPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "Please LogIn if You Wish to Delete Your Account");
        res.redirect("/login")
    } else {
        res.render("deleteAcntPage", {session : req.session.user_ApiToken});
    }
}


/*
 * Function to Delete a User's Account
 * If both the checkbox and radio button have been selected as yes to delete account
 * Then, it makes a post request to the API and awaits a response.
 * If the response report does not contain "Error" then the account was Deleted successfully
 * and redirected to the logout function.
 * Else it will flash an error as to why they cannot Delete the Account and redirect back to the Delete Account Page
 */
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
