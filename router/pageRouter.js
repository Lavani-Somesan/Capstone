/*
 * Contains the Page Routes of the app
 * Routes are linked to different controllers depending on the functionality 
 * (if there is any) of the page
 */

const router = require("express").Router(),
errorRouter = require("./errorRouter"),
pageController = require("../controllers/pageController");
inventoryController = require("../controllers/inventoryController");
newsFeedController = require("../controllers/newsFeedController");

//Page Routes
router.get("/", inventoryController.getHomePage);
router.get("/home", inventoryController.getHomePage);
router.get("/login", pageController.getLoginPage);
router.get("/create-account", pageController.getAccountCreationPage);
router.get("/account-guide", pageController.getAccountGuidePage);
router.get("/about", pageController.getAboutPage);

router.post("/search/", inventoryController.searchInventory);

//Game Routes
router.get("/games/", inventoryController.getGamePage);
router.get("/games/:title", inventoryController.getProduct);

//Merch Routes
router.get("/merchandise/", inventoryController.getMerchPage);
router.get("/merchandise/:title", inventoryController.getProduct);

//NewsFeed Routes
router.get("/newsFeed/", newsFeedController.getNewsFeedPage);

router.use("/", errorRouter);


module.exports = router;

