var express = require('express');
var router = express.Router();

const apiAdapter = require('../apiAdapter');
let BASE_URL = 'http://localhost:4000';
const api = apiAdapter(BASE_URL)



router.post('/user/create-account/:requestID', (req, res) => {
    let endPoint = req.path;

    console.log("Passing through API Endpoint");

    api.post(endPoint, req.body).then(resp => {
            console.log("Passing back through API Endpoint");
            res.json(resp.data);
        })
        .catch(error => {
            console.log(`Request Failed: ${error.message}`);
        });
});


router.post('/user/authentication/:requestID', (req, res) => {
    let endPoint = req.path;

    console.log("\nPassing through API Endpoint");

    api.post(endPoint, req.body).then(resp => {
            console.log("Passing back through API Endpoint");
            res.json(resp.data);
        })
        .catch(error => {
            console.log(`Request Failed: ${error.message}`);
        });
});



module.exports = router;