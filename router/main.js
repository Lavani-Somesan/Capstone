/*
 * File called by the Server.js
 * If route starts with /user it will route to the userRouter
 * If route does not have the /user it will just go to pageRouter
 */

const router = require("express").Router(),
    pageRouter = require("./pageRouter"),
    userRouter = require("./userRouter");

    router.use("/user", userRouter); //Needs to be above '/' router otherwise the error page overrides user post routes
    router.use("/", pageRouter);

module.exports = router;