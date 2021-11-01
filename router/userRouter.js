const router = require("express").Router(),
userController = require("../controllers/userController");


router.post("/create-account", userController.createUser);

router.post("/authentication", userController.authentication)


module.exports = router;