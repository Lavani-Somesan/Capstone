/*
 * API is the intermediary between the server and the services
 * Defines the Modules and Middleware the API needs
 * Launches the API
 */
const path = require('path');
const env = require("dotenv").config({ path: '../.env'});

const port = process.env.API_PORT || 2000;

let express = require('express');
let app = express();

let userRouter = require('./routes/userRoutes');
let inventoryRouter = require('./routes/inventoryRoutes');
let newsFeedRouter = require('./routes/newsFeedRoutes');


let bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter);
app.use(inventoryRouter);
app.use(newsFeedRouter);

app.listen(port, () => {
    console.log(`API is listening on localhost:${port}`);
});