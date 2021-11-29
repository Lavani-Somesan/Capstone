const port = 4000;
let bodyParser = require('body-parser');

express = require("express"),
    mongoose = require('mongoose'),
    User = require('./models/userModel');

//This snippet of code needs to be directly under User = require() for it to work
let userService = require("./userService");

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
app.post('/user/create-account/:requestID', userService.createUser);
app.post('/user/authentication/:requestID', userService.authenticate);
app.post('/user/account-settings/change-password/:token', userService.changePassword);
app.post('/user/account-settings/update-profile/email/:token', userService.updateEmail);
app.post('/user/account-settings/update-profile/name/:token', userService.updateName);
app.post('/user/account-settings/update-profile/birthday/:token', userService.updateBday);

app.post('/user/account-settings/delete-account/:token', userService.deleteAccount);

app.get('/apiToken/:token', userService.update_ApiToken);
app.get('/user/profile/apiToken/:token', userService.getProfile);

app.listen(port, () => {
    console.log(`User Service is Listening on localhost:${port}`);
});