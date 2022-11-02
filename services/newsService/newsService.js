let mongoose = require('mongoose'),
    NewsFeed = mongoose.model('NewsFeed');


exports.getNewsFeed = function(req, res) {

    
    NewsFeed.find({}, function(err, news) {

        if(news) {
            console.log("Get News", "Response", "Success, Retrieved  all News");
        } else {

            if(err) {
                console.log("Get News", "Response", "Error, " + error.message);
            } else {
                console.log("Get News", "Response", "Error, News Cannot Be Found");
            }
        }
        
        res.json(news);
    });
    
};






