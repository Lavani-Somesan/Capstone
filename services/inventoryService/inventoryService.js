const e = require('express');

let mongoose = require('mongoose'),
    Inventory = mongoose.model('Inventory');


    exports.getGames = function(req, res) {

        Inventory.find({category : 'games'}, function(err, games) {
            let randomID = Math.floor((Math.random() * 100000) + 10000);
            console.log("inventory", req.path, "response", "Success, retrieved  all products", randomID);
            
            res.json(games);
        });
    };