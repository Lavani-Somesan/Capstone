const port = 2000;

let userRouter = require('./routes/userRoutes');

let express = require('express');
let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter);

app.listen(port, () => {
    console.log(`API is listening on localhost:${port}`);
});