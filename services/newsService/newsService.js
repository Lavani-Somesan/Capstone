let mongoose = require('mongoose'),
    NewsFeed = mongoose.model('NewsFeed');


exports.getNewsFeed = function(req, res) {

    
    NewsFeed.find({}, function(err, news) {

        let randomID = Math.floor((Math.random() * 100000) + 10000);

        console.log("inventory", req.path, "response", "Success, retrieved  all games", randomID);
        
        res.json(news);
    });
    
};






