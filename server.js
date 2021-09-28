const path = require('path');
const router = require("./router");
const port = 8050;

express = require("express");
layouts = require("express-ejs-layouts");

app = express()

app.set('views', path.join(__dirname, 'views'));
app.use('/', express.static(__dirname + '/public'));

app.set("view engine", "ejs");
app.use(layouts);

app.use(router);

app.listen(port, () => {
    console.log(`The Server is listening on port number: ${port}`);
})
    