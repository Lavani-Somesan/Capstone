/*
 * API User Routes that get requests from the server and
 * sends them to the User Service.
 * Then, it sends the response that it gets from the User Service 
 * back to the server.
 */

var express = require('express');
var router = express.Router();

const apiAdapter = require('../apiAdapter');
let BASE_URL = process.env.USER_ENDPOINT || 'http://localhost:4000';
const api = apiAdapter(BASE_URL)

/*
 * All Routes in this file!
 * Gets a request from the server with a matching URL
 * Makes a get/post request to the User Service and awaits a response.
 * Sends back a response to the server.
 * If there was an error, it will print error and send back null to server.
 */


router.post('/user/create-account/', (req, res) => {
    let endPoint = req.path;

    console.log("Passing through API Endpoint");

    api.post(endPoint, req.body).then(resp => {
            console.log("Passing back through API Endpoint");
            res.json(resp.data);
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
            res.send(null);
        });
});


router.post('/user/authentication/', (req, res) => {
    let endPoint = req.path;

    console.log("\nPassing through API Endpoint");

    api.post(endPoint, req.body).then(resp => {
            console.log("Passing back through API Endpoint");
            res.json(resp.data);
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
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
            console.log(`API, Request Failed: ${error.message}\n`);
            res.send(null);
        });
});

router.post('/user/account-settings/update-profile/email/:token', (req, res) => {
    let endPoint = req.path;

    console.log("Passing through API Endpoint");

    api.post(endPoint, req.body).then(resp => {
            console.log("Passing back through API Endpoint");
            res.json(resp.data);
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
            res.send(null);
        });
});

router.post('/user/account-settings/update-profile/name/:token', (req, res) => {
    let endPoint = req.path;

    console.log("Passing through API Endpoint");

    api.post(endPoint, req.body).then(resp => {
            console.log("Passing back through API Endpoint");
            res.json(resp.data);
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
            res.send(null);
        });
});


router.post('/user/account-settings/update-profile/birthday/:token', (req, res) => {
    let endPoint = req.path;

    console.log("Passing through API Endpoint");

    api.post(endPoint, req.body).then(resp => {
            console.log("Passing back through API Endpoint");
            res.json(resp.data);
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
            res.send(null);
        });
});

router.post('/user/account-settings/delete-account/:token', (req, res) => {
    let endPoint = req.path;

    console.log("Passing through API Endpoint");

    api.post(endPoint, req.body).then(resp => {
            console.log("Passing back through API Endpoint");
            res.json(resp.data);
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
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
        console.log(`API, Request Failed: ${error.message}\n`);
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
        console.log(`API, Request Failed: ${error.message}\n`);
        res.send(null);
    })
});


module.exports = router;