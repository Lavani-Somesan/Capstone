const router = require("express").Router(),
errorRouter = require("./errorRouter"),
userController = require("../controllers/userController");


router.post("/create-account", userController.createUser);
router.post("/authentication", userController.authentication);
router.get("/logout", userController.logout);
router.get("/profile", userController.getProfilePage);

router.get("/account-settings/", userController.getAccountSettingsPage);
router.get("/account-settings/change-password", userController.getChangePasswordPage);
router.post("/account-settings/change-password", userController.changePassword);


router.get("/cart", userController.getCartPage);
router.get("/cart/add/:id", userController.addToCart);
router.get("/cart/remove/:id", userController.removeFromCart);

router.use("/user", errorRouter);

module.exports = router;