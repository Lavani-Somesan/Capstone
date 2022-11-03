/*
 * Defines the Route Functionality of the
 * NewsFeed Service
 */

let mongoose = require('mongoose'),
    NewsFeed = mongoose.model('NewsFeed');

/*
 * Function to get the NewsFeed from Database
 * Using the NewsFeed model we can use the Mongoose
 * .find query to find all the news objects in the 
 * database.
 * Returns the news object
 */    
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