const e = require('express');

let mongoose = require('mongoose'),
    Inventory = mongoose.model('Inventory');


    exports.getGames = function(req, res) {

        Inventory.find({category : 'games'}, function(err, games) {
            let randomID = Math.floor((Math.random() * 100000) + 10000);
            console.log("inventory", req.path, "response", "Success, retrieved  all games", randomID);
            
            res.json(games);
        });
    };

    exports.getMerch = function(req, res) {

        Inventory.find({category : 'merchandise'}, function(err, merch) {
            let randomID = Math.floor((Math.random() * 100000) + 10000);
            console.log("inventory", req.path, "response", "Success, retrieved  all merch", randomID);
            
            res.json(merch);
        });
    };


    exports.getProduct = function(req, res) {
        
        Inventory.findOne({title : req.params.title}, function(err, product) {
            let randomID = Math.floor((Math.random() * 100000) + 10000);

            if(product == 0) {
                console.log("Product", req.path, "response", "Error, Product Cannot be Retreived", randomID + "\n\n");

            } else {
                console.log("Product", req.path, "response", "Success, Product Retreived", randomID + "\n\n");
            }
            
            res.json(product);
        });
    }


    exports.addToCart = function(req, res) {
        
        Inventory.findOne({_id : req.params.id}, function(err, product) {
            let randomID = Math.floor((Math.random() * 100000) + 10000);

            if(product == 0) {
                console.log("Product", req.path, "response", "Error, Product Cannot be Found", randomID + "\n\n");

            } else {
                console.log("Product", req.path, "response", "Success, Product Found", randomID + "\n\n");
            }
            
            res.json(product);
        });
    }


    exports.getSearhResults = function(req, res) {
        
        Inventory.find({ $or:[{"brand": { $regex: `${req.params.searchParam}`, $options: "i"}}, {"title": { $regex: `${req.params.searchParam}`, $options: "i"}},
         {"description": { $regex: `${req.params.searchParam}`, $options: "i"}} ]}, function(err, resultsForTitle) {

            let randomID = Math.floor((Math.random() * 100000) + 10000);
            
            if(resultsForTitle < 1) {
                console.log("search results", req.path, "response", "Error, Searched for matching results, none found", randomID + "\n\n");

            } else {
                console.log("search results", req.path, "response", "Success, Searched for matching results, found", randomID) + "\n\n";
            }
        
            res.json(resultsForTitle);
        });
    };

