const port = 2000;

let express = require('express');
let app = express();

let userRouter = require('./routes/userRoutes');
let inventoryRouter = require('./routes/inventoryRoutes');


let bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter);
app.use(inventoryRouter);

app.listen(port, () => {
    console.log(`API is listening on localhost:${port}`);
});