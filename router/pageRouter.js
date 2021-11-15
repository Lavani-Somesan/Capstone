const router = require("express").Router(),
errorRouter = require("./errorRouter"),
pageController = require("../controllers/pageController");
inventoryController = require("../controllers/inventoryController");

//Page Routes
router.get("/", pageController.getHomePage);
router.get("/home", pageController.getHomePage);
router.get("/login", pageController.getLoginPage);
router.get("/create-account", pageController.getAccountCreationPage);
router.get("/account-guide", pageController.getAccountGuidePage);
router.get("/about", pageController.getAboutPage);
router.get("/account-guide", pageController.getAccountGuidePage);
router.get("/newsfeed", pageController.getNewsFeedPage);

router.get("/merchandise", inventoryController.getMerchPage);
router.get("/games", inventoryController.getGamePage);

router.post("/search/", inventoryController.searchInventory);

router.use("/", errorRouter);


module.exports = router;

