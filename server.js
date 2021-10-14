const port = 8050;
const path = require('path');
const router = require("./router/main");

let bodyParser = require('body-parser');
express = require("express");
layouts = require("express-ejs-layouts");

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.use('/', express.static(__dirname + '/public'));
app.use('/user', express.static(__dirname + '/public'));

app.set("view engine", "ejs");
app.use(layouts);

app.use(router);

app.listen(port, () => {
    console.log(`The Server is listening on port number: ${port}`);
})
    