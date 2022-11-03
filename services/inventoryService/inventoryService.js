/*
 * Defines the Route Functionality of the
 * Inventory Service
 */

const e = require('express');

let mongoose = require('mongoose'),
    Inventory = mongoose.model('Inventory');


/*
 * Function to get the Favorite Inventory from Database
 * We can use the Mongoose .find query and use filter 
 * for any objects that have the favorite value set to Yes.
 * Return the favInv object
 */      
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


/*
 * Function to get all the Games from Database
 * We can use the Mongoose .find query and use filter 
 * for any objects that have the category value set to games.
 * Return the games object
 */  
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


/*
 * Function to get All the Merchandise from Database
 * We can use the Mongoose .find query and use filter 
 * for any objects that have the category value set to merchandise.
 * Return the merch object
 */  
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


/*
 * Function to get a Product from Database
 * We can use the Mongoose .findOne query and use the filter 
 * by the title of the product to return a matching object from db.
 * Return the product object
 */  
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


/*
 * Function to get a Product from Database to Add to User's Cart
 * We can use the Mongoose .findOne query and use the filter 
 * by the product id to return a matching object from db.
 * Return the product object
 */  
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


/*
 * Function to get a Matching Objects from DB using a Search Query
 * We can use the Mongoose .find query and use filters brand or title
 * to see if the search query the user inputted matches any Inventory
 * objects in the DB.
 * Return the searchQueryResult object
 */  
exports.getSearhResults = function(req, res) {
    
    Inventory.find({ $or:[{"brand": { $regex: `${req.params.searchParam}`, $options: "i"}}, {"title": { $regex: `${req.params.searchParam}`, $options: "i"}},
            ]}, function(err, searchQueryResult) {
        
        if(searchQueryResult < 1) {
            if(err) {
                console.log("Search Results", "response", "Error, " + err.message);
            } else {
                console.log("Search Results", "response", "Error, Searched for matching results, none found\n");
            }

        } else {
            console.log("Search Results", "response", "Success, Searched for matching results, found\n");
        }
    
        res.json(searchQueryResult);
    });
};