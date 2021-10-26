const router = require("express").Router(),
pageController = require("../controllers/pageController");

//Page Routes
router.get("/", pageController.getHomePage);
router.get("/home", pageController.getHomePage);
router.get("/login", pageController.getLoginPage);
router.get("/create-account", pageController.getAccountCreationPage);
router.get("/account-guide", pageController.getAccountGuidePage)

module.exports = router;

