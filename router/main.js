const router = require("express").Router(),
    pageRouter = require("./pageRouter"),
    userRouter = require("./userRouter");
    inventoryRouter = require("./inventoryRouter");

    router.use("/user", userRouter); //Needs to be above '/' router otherwise the error page overrides user post routes
    //router.use("/inventory", inventoryRouter);
    router.use("/", pageRouter);

module.exports = router;