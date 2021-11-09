var express = require('express');
var router = express.Router();

const apiAdapter = require('../apiAdapter');
let BASE_URL = 'http://localhost:5000';
const api = apiAdapter(BASE_URL);



router.get('/games', (req, res) => {
    let endpoint = req.path;

    console.log("\nPassing through API Endpoint");

    api.get(endpoint).then(resp => {
            console.log("Passing back through API Endpoint\n");
            
            res.json(resp.data)
        })
        .catch(error => {
            console.log("Error in transmission\n");
            return 0;
        });
});


module.exports = router;