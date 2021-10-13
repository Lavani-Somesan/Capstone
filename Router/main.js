const router = require("express").Router(),
    pageRouter = require("./pageRouter");

    router.use("/", pageRouter);

module.exports = router;