const router = require("express").Router(),
    pageRouter = require("./pageRouter"),
    userRouter = require("./userRouter");

    router.use("/user", userRouter); //Needs to be above '/' router otherwise the error page overrides user post routes
    router.use("/", pageRouter);

module.exports = router;