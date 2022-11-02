var express = require('express');
var router = express.Router();

const apiAdapter = require('../apiAdapter');
let BASE_URL = process.env.NEWSFEED_ENDPOINT || 'http://localhost:7000';
const api = apiAdapter(BASE_URL);



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