const apiAdapter = require('../api/apiAdapter');
const API_URL = 'http://localhost:2000';
const api = apiAdapter(API_URL);


exports.createUser = (req, res) => {
    
    let randID = Math.floor((Math.random() * 10000) + 10000);
    let endPoint = API_URL + '/user' + req.path + `/${randID}`;
    
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
        console.log(`Request Failed: ${error.message}`);
        res.redirect("/create-account");
    });

    
};


exports.authentication = (req, res) => {
    let randID = Math.floor((Math.random() * 100000) + 10000);
    let endPoint = API_URL + `/user/authentication/${randID}`;
    var isAuthenticated = 0;

    console.log("\n Posting login data to API");

    api.post(endPoint, req.body).then(resp => {
        const userObj = resp.data.user
            
        if(resp.data.responseID != null && resp.data.report != null){
            console.log("User Service", req.path, "response", resp.data.report, resp.data.responseID); 
        } 

        if (Object.keys(userObj).length > 0) {
            req.session.user_ApiToken = userObj.apiToken; //Starts session
            req.session.user_ID = resp.data._id; 

            req.flash("success", "Logged In Successfully!")
            res.redirect("/home");
        }
        else {
            console.log("User Not Found, Error Logging in\n");
            req.flash("error", "Failed to Log In");
            res.redirect("/login"); 
        }   
    })
    .catch(err => {
        console.log("Error Logging in\n");
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
        console.log(`Request Failed: ${error.message}`);
    });


};

exports.getProfilePage =(req, res) => {

    let endPoint = API_URL + `/user/profile/apiToken/${req.session.user_ApiToken}`;
    
    console.log("Posting to API\n");
    
    api.get(endPoint).then(resp => {

        const userObj = resp.data.user;

        if(resp.data.responseID != null && !resp.data.report.includes("Error")) {
            console.log(`Success, Response ID: ${resp.data.responseID}`);
        } else {
            console.log(`Error, Response ID:  ${resp.data.responseID}`);
        }

        console.log(resp.data.user);
        
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
        console.log(`Request Failed: ${error.message}`);
    });
}


exports.getCartPage = (req, res) => {

    if(!req.session.user_ApiToken) {
        req.flash("error", "LogIn to View Cart");
        res.redirect("/login");
    } else {
        res.render("cart", {session : req.session.user_ApiToken, data : req.session.cart});
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
                res.redirect("/user/cart");
            } else  {
                req.flash("error", "Error Adding Item to Cart, Please Try Again");
                res.redirect("/home");
            }
          })
          .catch((error) => {
            req.flash("error", "Error Product Cannot Be Added to Cart");
            res.redirect("/cart");
          });
          
    }
};