const e = require('express');

let mongoose = require('mongoose'),
    Inventory = mongoose.model('Inventory');


    exports.getFavoriteInv = function(req, res) {
        
        Inventory.find({favorite : 'Yes'}, function(err, favInv) {

            if(favInv) {
                console.log("Get Favorite Inv", "response", "Success, Favorite Inventory Retreived\n");

            } else {
                if(err) {
                    console.log("Get Favorite Inv", "response", "Error, " + err.message);
                } else {
                    console.log("Get Favorite Inv", "response", "Error, No Favorite Inventory Found\n");
                }
            }
            
            res.json(favInv);
        });
    }


    exports.getGames = function(req, res) {

        Inventory.find({category : 'games'}, function(err, games) {
            
            if(games) {
                console.log("Get Games", "response", "Success, Retrieved  all Games");

            } else {
                if(err) {
                    console.log("Get Games", "response", "Error, " + err.message);
                } else {
                    console.log("Get Games", "response", "Error, No Games Found\n");
                }
            }
            res.json(games);
        });
    };

    exports.getMerch = function(req, res) {

        Inventory.find({category : 'merchandise'}, function(err, merch) {
            
            if(merch) {
                console.log("Get Merch", "response", "Success, Retrieved  all Merch");

            } else {
                console.log("Get Merch", "response", "Error, No Merch Found\n\n");
            }
            
            res.json(merch);
        });
    };


    exports.getProduct = function(req, res) {
        
        Inventory.findOne({title : req.params.title}, function(err, product) {

            if(product) {
                console.log("Get Product", "response", "Success, Product Retreived\n");

            } else {
                if(err) {
                    console.log("Get Product", "response", "Error, " + err.message);
                } else {
                    console.log("Get Product", "response", "Error, Product Cannot be Retreived\n");
                }
            }
            
            res.json(product);
        });
    }


    exports.addToCart = function(req, res) {
        
        Inventory.findOne({_id : req.params.id}, function(err, product) {

            if(product) {
                console.log("Add Product to Cart", "response", "Success, Product Found\n");

            } else {
                if(err) {
                    console.log("Add Product to Cart", "response", "Error, " + err.message);
                } else {
                    console.log("Add Product to Cart", "response", "Error, Product Cannot be Found\n");
                }
            }
            
            res.json(product);
        });
    }


    exports.getSearhResults = function(req, res) {
        
        Inventory.find({ $or:[{"brand": { $regex: `${req.params.searchParam}`, $options: "i"}}, {"title": { $regex: `${req.params.searchParam}`, $options: "i"}},
             ]}, function(err, resultsForTitle) {
            
            if(resultsForTitle < 1) {
                if(err) {
                    console.log("Search Results", "response", "Error, " + err.message);
                } else {
                    console.log("Search Results", "response", "Error, Searched for matching results, none found\n");
                }

            } else {
                console.log("Search Results", "response", "Success, Searched for matching results, found\n");
            }
        
            res.json(resultsForTitle);
        });
    };

