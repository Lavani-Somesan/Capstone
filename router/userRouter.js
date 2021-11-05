const router = require("express").Router(),
errorRouter = require("./errorRouter"),
userController = require("../controllers/userController");


router.post("/create-account", userController.createUser);
router.post("/authentication", userController.authentication);


router.use("/user", errorRouter);

module.exports = router;