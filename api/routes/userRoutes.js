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
            console.log(`Request Failed: ${error.message}\n`);
            res.send(null);
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
            console.log(`Request Failed: ${error.message}\n`);
            res.send(null);
        });
});


router.post('/user/account-settings/change-password/:token', (req, res) => {
    let endPoint = req.path;

    console.log("Passing through API Endpoint");

    api.post(endPoint, req.body).then(resp => {
            console.log("Passing back through API Endpoint");
            res.json(resp.data);
        })
        .catch(error => {
            console.log(`Request Failed: ${error.message}\n`);
            res.send(null);
        });
});


router.get('/apiToken/:token', (req, res, next) => {
    let endpoint = req.path;

    console.log("\nPassing through API Endpoint");
    
    api.get(endpoint).then((resp) => {
        console.log("Passing back through API Endpoint");
        res.json(resp.data);
    })
    .catch(error => {
        console.log(error.message);
        res.send(null);
    })
});

router.get('/user/profile/apiToken/:token', (req, res) => {
    let endpoint = req.path;

    console.log("\nPassing through API Endpoint");
    
    api.get(endpoint).then((resp) => {
        console.log("Passing back through API Endpoint");
        res.json(resp.data);
    })
    .catch(error => {
        console.log(error.message);
        res.send(null);
    })
});


module.exports = router;