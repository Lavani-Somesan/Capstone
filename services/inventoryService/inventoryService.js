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


    exports.getSearhResults = function(req, res) {
        
        Inventory.find({ $or:[{"title": { $regex: `${req.params.title}`, $options: "i"}}, {"brand": { $regex: `${req.params.title}`, $options: "i"}} ]},
        function(err, resultsForTitle) {

            let randomID = Math.floor((Math.random() * 100000) + 10000);
            
            if(resultsForTitle < 1) {
                console.log("search results", req.path, "response", "Error, Searched for matching results, none found", randomID + "\n");

            } else {
                console.log("search results", req.path, "response", "Success, Searched for matching results, found", randomID) + "\n";
            }
        
            res.json(resultsForTitle);
        });
    };

