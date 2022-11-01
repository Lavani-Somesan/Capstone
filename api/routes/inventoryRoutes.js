var express = require('express');
var router = express.Router();

const apiAdapter = require('../apiAdapter');
let BASE_URL = 'http://localhost:5000';
const api = apiAdapter(BASE_URL);

router.get('/', (req, res) => {
    let endpoint = req.path;

    console.log("\nPassing through API Endpoint");

    api.get(endpoint).then(resp => {
            console.log("Passing back through API Endpoint\n");
            
            res.send(resp.data)
        })
        .catch(error => {
            console.log("Error in transmission\n");
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
            console.log("Error in transmission\n");
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
            console.log("Error in transmission\n");
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
            console.log("Error in transmission\n");
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
            console.log("Error in transmission\n");
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
            console.log("Error in transmission\n");
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
            console.log("Error in transmission\n");
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
        console.log(error.message);
        res.send(null);
    })
});


module.exports = router;