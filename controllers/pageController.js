exports.getHomePage = (req, res) => {
    
    res.render("home");
}

exports.getLoginPage = (req, res) => {
    
    res.render("login");
}

exports.getAccountCreationPage = (req, res) => {
    
    res.render("accountCreation");
}

exports.getAccountGuidePage = (req, res) => {
    
    res.render("accountGuide");
}

exports.getAboutPage = (req, res) => {
    res.render("about");

}