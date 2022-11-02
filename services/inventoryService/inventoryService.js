const e = require('express');

let mongoose = require('mongoose'),
    Inventory = mongoose.model('Inventory');


    exports.getFavoriteInv = function(req, res) {
        
        Inventory.find({favorite : 'Yes'}, function(err, favInv) {

            if(favInv == 0) {
                console.log("Favorite Inv", req.path, "response", "Error, Favorite Inventory Cannot be Retreived\n\n");

            } else {
                console.log("Favorite Inv", req.path, "response", "Success, Favorite Inventory Retreived\n\n");
            }
            
            res.json(favInv);
        });
    }


    exports.getGames = function(req, res) {

        Inventory.find({category : 'games'}, function(err, games) {
            
            console.log("inventory", req.path, "response", "Success, retrieved  all games");
            
            res.json(games);
        });
    };

    exports.getMerch = function(req, res) {

        Inventory.find({category : 'merchandise'}, function(err, merch) {
            
            console.log("inventory", req.path, "response", "Success, retrieved  all merch");
            
            res.json(merch);
        });
    };


    exports.getProduct = function(req, res) {
        
        Inventory.findOne({title : req.params.title}, function(err, product) {

            if(product == 0) {
                console.log("Product", req.path, "response", "Error, Product Cannot be Retreived\n\n");

            } else {
                console.log("Product", req.path, "response", "Success, Product Retreived\n\n");
            }
            
            res.json(product);
        });
    }


    exports.addToCart = function(req, res) {
        
        Inventory.findOne({_id : req.params.id}, function(err, product) {

            if(product == 0) {
                console.log("Product", req.path, "response", "Error, Product Cannot be Found\n\n");

            } else {
                console.log("Product", req.path, "response", "Success, Product Found\n\n");
            }
            
            res.json(product);
        });
    }


    exports.getSearhResults = function(req, res) {
        
        Inventory.find({ $or:[{"brand": { $regex: `${req.params.searchParam}`, $options: "i"}}, {"title": { $regex: `${req.params.searchParam}`, $options: "i"}},
             ]}, function(err, resultsForTitle) {
            
            if(resultsForTitle < 1) {
                console.log("search results", req.path, "response", "Error, Searched for matching results, none found\n\n");

            } else {
                console.log("search results", req.path, "response", "Success, Searched for matching results, found\n\n");
            }
        
            res.json(resultsForTitle);
        });
    };

