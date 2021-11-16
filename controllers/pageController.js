exports.getHomePage = (req, res) => {
    
    res.render("home", {session : req.session.user_ApiToken});
}

exports.getLoginPage = (req, res) => {
    
    res.render("login", {session : req.session.user_ApiToken});
}

exports.getAccountCreationPage = (req, res) => {
    
    res.render("accountCreation", {session : req.session.user_ApiToken});
}

exports.getAccountGuidePage = (req, res) => {
    
    res.render("accountGuide", {session : req.session.user_ApiToken});
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