/*
 * API Inventory Routes that get requests from the server and
 * sends them to the Inventory Service.
 * Then, it sends the response that it gets from the Inventory Service 
 * back to the server.
 */

var express = require('express');
var router = express.Router();

const apiAdapter = require('../apiAdapter');
let BASE_URL = process.env.INVENTORY_ENDPOINT || 'http://localhost:5000';
const api = apiAdapter(BASE_URL);


/*
 * All Routes in this file!
 * Gets a request from the server with a matching URL
 * Makes a get request to the Inventory Service and awaits a response.
 * Sends back a response to the server.
 * If there was an error, it will print error and send back null to server.
 */

router.get('/', (req, res) => {
    let endpoint = req.path;

    console.log("\nPassing through API Endpoint");

    api.get(endpoint).then(resp => {
            console.log("Passing back through API Endpoint\n");
            
            res.send(resp.data)
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
            res.send(null);
        });
});


router.get('/home', (req, res) => {
    let endpoint = req.path;

    console.log("\nPassing through API Endpoint");

    api.get(endpoint).then(resp => {
            console.log("Passing back through API Endpoint\n");
            
            res.send(resp.data)
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
            res.send(null);
        });
});



router.get('/games/', (req, res) => {
    let endpoint = req.path;

    console.log("\nPassing through API Endpoint");

    api.get(endpoint).then(resp => {
            console.log("Passing back through API Endpoint\n");
            
            res.send(resp.data)
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
            res.send(null);
        });
});


router.get('/games/:title', (req, res) => {
    let endpoint = req.path;

    console.log("\nPassing through API Endpoint");

    api.get(endpoint).then(resp => {
            console.log("Passing back through API Endpoint\n");
            
            res.send(resp.data)
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
            res.send(null);
        });
});


router.get('/merchandise/:title', (req, res) => {
    let endpoint = req.path;

    console.log("\nPassing through API Endpoint");

    api.get(endpoint).then(resp => {
            console.log("Passing back through API Endpoint\n");
            
            res.send(resp.data)
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
            res.send(null);
        });
});


router.get('/merchandise/', (req, res) => {
    let endpoint = req.path;

    console.log("\nPassing through API Endpoint");

    api.get(endpoint).then(resp => {
            console.log("Passing back through API Endpoint\n");
            
            res.send(resp.data)
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
            res.send(null);
        });
});


router.get('/search/:searchParam', (req, res) => {
    let endpoint = req.path;

    console.log("\nPassing through API Endpoint");

    api.get(endpoint).then(resp => {
            console.log("Passing back through API Endpoint\n");
            
            res.send(resp.data)
        })
        .catch(error => {
            console.log(`API, Request Failed: ${error.message}\n`);
            res.send(null);
        });

});


router.get('/cart/add/:id', (req, res) => {
    let endPoint = req.path;

    console.log("\nPassing through API Endpoint");
    
    api.get(endPoint).then((resp) => {
        console.log("Passing back through API Endpoint");
        res.json(resp.data);
    })
    .catch(error => {
        console.log(`API, Request Failed: ${error.message}\n`);
        res.send(null);
    })
});


module.exports = router;