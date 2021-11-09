const httpStatus = require("http-status-codes");


exports.resNoResourceFound = (req, res) => {
    let errorCode = httpStatus.StatusCodes.NOT_FOUND;
    res.status(errorCode);
    res.render(`${errorCode}`, {session : req.session.user_ApiToken});
};


exports.resInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(`Error Occurred: ${error.stack}`);
    res.status(errorCode);
    res.render(`${errorCode}`, {session : req.session.user_ApiToken});
};