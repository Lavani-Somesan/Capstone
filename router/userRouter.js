const router = require("express").Router(),
userController = require("../controllers/userController");


router.post("/create-account", userController.createUser);


module.exports = router;