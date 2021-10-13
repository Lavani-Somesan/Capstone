const router = require("express").Router(),
    pageRouter = require("./pageRouter"),
    userRouter = require("./userRouter");

    router.use("/", pageRouter);
    router.use("/user", userRouter);

module.exports = router;