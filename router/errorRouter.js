const router = require("express").Router(),
errorController = require("../controllers/errorController");

//Error Routes
router.use(errorController.resNoResourceFound);
router.use(errorController.resInternalError);


module.exports = router;