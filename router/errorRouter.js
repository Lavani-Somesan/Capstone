/*
 * Contains the Current Error routes for the app
 * If the Route that the user requests is not found or if there is a internal server error
 * it routes to the errorController which handles the error functionality 
 */
const router = require("express").Router(),
errorController = require("../controllers/errorController");

//Error Routes
router.use(errorController.resNoResourceFound);
router.use(errorController.resInternalError);

module.exports = router;