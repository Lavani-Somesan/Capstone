/*
 * API NewsFeed Route that gets requests from the server and
 * sends them to the NewsFeed Service.
 * Then, it sends the response that it gets from the NewsFeed Service 
 * back to the server.
 */
var express = require('express');
var router = express.Router();

const apiAdapter = require('../apiAdapter');
let BASE_URL = process.env.NEWSFEED_ENDPOINT || 'http://localhost:7000';
const api = apiAdapter(BASE_URL);

/*
 * Gets a request from the server with a matching URL
 * Makes a get request to the NewsFeed Service and awaits a response.
 * Sends back a response to the server.
 * If there was an error, it will print error and send back null to server.
 */
router.get('/newsFeed/', (req, res) => {
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



module.exports = router;