const port = 7000;
let bodyParser = require('body-parser');
const apiAdapter = require('../../api/apiAdapter');

express = require("express"),
    mongoose = require('mongoose'),
    NewsFeed = require('./models/newsModel');

//This snippet of code needs to be directly under Inventory = require() for it to work
let newsService = require("./newsService");

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
app.get('/newsFeed/', newsService.getNewsFeed);


app.listen(port, () => {
    console.log(`NewsFeed Service is Listening on localhost:${port}`);
});