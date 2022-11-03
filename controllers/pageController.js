/*
 * pageController.js
 * Defines the Different Page Route Functionality 
 */


/*
 * Function to get the login page
 * If the user is in a session then they cannot go to this page and will be reidrected.
 * Otherwise it will render the login page from the Views folder.
 */
exports.getLoginPage = (req, res) => {

    if (req.session.user_ApiToken) {
        req.flash("error", "Already Logged In!");
        res.redirect("/user/profile");
    } else {
        res.render("login", {session : req.session.user_ApiToken});
    }
}

/*
 * Function to get the Create Account Page
 * If the user is in a session then they cannot go to this page and will be reidrected.
 * Otherwise it will render the account Creation page from the Views folder.
 */
exports.getAccountCreationPage = (req, res) => {

    if (req.session.user_ApiToken) {
        req.flash("error", "Error, Cannot Create an Account Since You Are Logged In!");
        res.redirect("/user/profile");
    } else {
        res.render("accountCreation", {session : req.session.user_ApiToken});
    }
}

/*
 * Function to get the Account Guide Page
 * If the user is in a session then they cannot go to this page and will be reidrected.
 * Otherwise it will render the account guide page from the Views folder.
 */
exports.getAccountGuidePage = (req, res) => {
    
    if (req.session.user_ApiToken) {
        req.flash("error", "Error, Cannot Create an Account or LogIn Since You Are Logged In!");
        res.redirect("/user/profile");
    } else {
        res.render("accountGuide", {session : req.session.user_ApiToken});
    }
}

/*
 * Function to get the About page
 * Renders the about page from the Views folder
 */
exports.getAboutPage = (req, res) => {
    res.render("about", {session : req.session.user_ApiToken});
}