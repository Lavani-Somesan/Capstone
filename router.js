const router = require("express").Router();
pageController = require("./Controllers/pageController");


//Page Routes
router.get("/", pageController.getHomePage);
router.get("/home", pageController.getHomePage);

module.exports = router;