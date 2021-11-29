const port = 8050;
const path = require('path');
const router = require("./router/main");

const expressSession = require("express-session"),
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash");

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
        sameSite: true  //Strict, means that cookie will only be attached to req from same site.
    },
}));


//Connecting Flash Messaging 
app.use(connectFlash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

//Cart middleware
app.use(function(req, res, next){
    if(!req.session.cart){
	  req.session.cart = [];
	}
    else {
        res.locals.cartItems = req.session.cart;
    }
	next();
  });


app.set('views', path.join(__dirname, 'views'));
app.use('/', express.static(__dirname + '/public'));
app.use('/user', express.static(__dirname + '/public'));
app.use('/user/account-settings/', express.static(__dirname + '/public'));
app.use('/user/account-settings/update-profile/', express.static(__dirname + '/public'));
app.use('/search/', express.static(__dirname + '/public'));
app.use('/games/', express.static(__dirname + '/public'));
app.use('/merchandise/', express.static(__dirname + '/public'));
app.use('/newsFeed/', express.static(__dirname + '/public'));

app.set("view engine", "ejs");
app.use(layouts);

app.use(router);

app.listen(port, () => {
    console.log(`The Server is listening on port number: ${port}`);
})
    