const router = require("express").Router(),
errorRouter = require("./errorRouter"),
userController = require("../controllers/userController");


router.post("/create-account", userController.createUser);
router.post("/authentication", userController.authentication);
router.get("/logout", userController.logout);
router.get("/profile", userController.getProfilePage);
router.get("/cart", userController.getCartPage);
router.get("/cart/add/:id", userController.addToCart);
router.get("/cart/remove/:id", userController.removeFromCart);

router.use("/user", errorRouter);

module.exports = router;