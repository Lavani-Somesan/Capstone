const path = require('path');
const env = require("dotenv").config({ path: '../../.env'});

const port = process.env.INVENTORY_SERVICE_PORT || 5000;
let bodyParser = require('body-parser');
const apiAdapter = require('../../api/apiAdapter');

express = require("express"),
    mongoose = require('mongoose'),
    Inventory = require('./models/inventoryModel');

//This snippet of code needs to be directly under Inventory = require() for it to work
let inventoryService = require("./inventoryService");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connecting to mongoose
mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.DB_CONNECT_KEY, { useNewUrlParser: true,  useUnifiedTopology: true}
);
const dataBase = mongoose.connection;

//Connecting to database
dataBase.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!!");
});


//Routes
app.get('/', inventoryService.getFavoriteInv);
app.get('/home', inventoryService.getFavoriteInv);
app.get('/games/', inventoryService.getGames);
app.get('/merchandise/', inventoryService.getMerch);
app.get('/games/:title', inventoryService.getProduct);
app.get('/merchandise/:title', inventoryService.getProduct);
app.get('/search/:searchParam', inventoryService.getSearhResults);
app.get('/cart/add/:id', inventoryService.addToCart);


app.listen(port, () => {
    console.log(`Inventory Service is Listening on localhost:${port}`);
});