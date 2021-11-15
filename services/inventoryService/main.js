const port = 5000;
let bodyParser = require('body-parser');

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
    "mongodb+srv://stationXUser:stationX@cluster0.q4lpz.mongodb.net/StationX?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true}
);
const dataBase = mongoose.connection;

//Connecting to database
dataBase.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!!");
});


//Routes
app.get('/games', inventoryService.getGames);


app.listen(port, () => {
    console.log(`Inventory Service is Listening on localhost:${port}`);
});