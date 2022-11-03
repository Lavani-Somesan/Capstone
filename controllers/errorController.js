/*
 * errorController.js
 * Defines the Different Error Route Functionality 
 */
const httpStatus = require("http-status-codes");

/*
 * If a Route is Not Found or Listed this function will be called.
 * Gets the errorCode (404) and renders the page matching the error code
 * from the Views folder.
 */
exports.resNoResourceFound = (req, res) => {
    let errorCode = httpStatus.StatusCodes.NOT_FOUND;
    res.status(errorCode);
    res.render(`${errorCode}`, {session : req.session.user_ApiToken});
};


/*
 * If the Server has an internal error when routing, this function will be called.
 * Gets the errorCode (500) and renders the page matching the error code
 * from the Views folder.
 */
exports.resInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(`Error Occurred: ${error.stack}`);
    res.status(errorCode);
    res.render(`${errorCode}`, {session : req.session.user_ApiToken});
};