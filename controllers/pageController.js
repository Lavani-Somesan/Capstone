exports.getHomePage = (req, res) => {
    
    res.render("home", {session : req.session.user_ApiToken});
}

exports.getLoginPage = (req, res) => {

    if (req.session.user_ApiToken) {
        req.flash("error", "Already Logged In!");
        res.redirect("/user/profile");
    } else {
        res.render("login", {session : req.session.user_ApiToken});
    }
}

exports.getAccountCreationPage = (req, res) => {

    if (req.session.user_ApiToken) {
        req.flash("error", "Error, Cannot Create an Account Since You Are Logged In!");
        res.redirect("/user/profile");
    } else {
        res.render("accountCreation", {session : req.session.user_ApiToken});
    }
}

exports.getAccountGuidePage = (req, res) => {
    
    if (req.session.user_ApiToken) {
        req.flash("error", "Error, Cannot Create an Account or LogIn Since You Are Logged In!");
        res.redirect("/user/profile");
    } else {
        res.render("accountGuide", {session : req.session.user_ApiToken});
    }
}

exports.getAboutPage = (req, res) => {
    res.render("about", {session : req.session.user_ApiToken});
}

exports.getMerchandisePage = (req, res) => {
    
    res.render("merchandise", {session : req.session.user_ApiToken});
}

exports.getGamesPage = (req, res) => {
    
    res.render("games", {session : req.session.user_ApiToken});
}

exports.getNewsFeedPage = (req, res) => {
    
    res.render("newsfeed", {session : req.session.user_ApiToken});

}
exports.getProfilePage = (req, res) => {
    
    res.render("profile", {session : req.session.user_ApiToken});

}