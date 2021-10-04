const router = require("express").Router();
pageController = require("./Controllers/pageController");


//Page Routes
router.get("/", pageController.getHomePage);
router.get("/home", pageController.getHomePage);
router.get("/login", pageController.getLoginPage);


module.exports = router;