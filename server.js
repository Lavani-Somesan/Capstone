const port = 8000;
const path = require('path');
const router = require("./router/main");

const expressSession = require("express-session"),
    cookieParser = require("cookie-parser");

let bodyParser = require('body-parser');
express = require("express");
layouts = require("express-ejs-layouts");

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Creating Session
app.use(cookieParser("secret__password"));
app.use(expressSession({
    name: 'sid',
    secret: 'secret__password',
    resave: false,
    saveUninitialized: false,
    
    cookie: {
        maxAge: 4000000,
        sameSite: true  //strict
    },
}));


app.set('views', path.join(__dirname, 'views'));
app.use('/', express.static(__dirname + '/public'));
app.use('/user', express.static(__dirname + '/public'));

app.set("view engine", "ejs");
app.use(layouts);

app.use(router);

app.listen(port, () => {
    console.log(`The Server is listening on port number: ${port}`);
})
    