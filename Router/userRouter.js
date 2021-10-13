const router = require("express").Router(),
userController = require("../Controllers/userController");


router.post("/create-account", userController.createUser);


module.exports = router;