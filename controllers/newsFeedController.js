/*
 * newsFeedController.js
 * Defines the NewsFeed Functionality 
 */

const apiAdapter = require('../api/apiAdapter');
const API_URL = process.env.API_ENDPOINT ||'http://localhost:2000';
const api = apiAdapter(API_URL);


/*
 * Function to get the NewsFeed 
 * Makes a get request to the API with the created endpoint URL. 
 * Awaits the response from the API and creates an object from the response data.
 * Renders newsfeed page regarless if there is data 
 */
exports.getNewsFeedPage = (req, res) => {
    let endPoint = API_URL + req.path;
    
    console.log("Posting to API\n");
    
    api.get(endPoint).then((resp) => {

      const feedObj = resp.data;

      if(feedObj) {
          console.log('Success in Retreiving NewsFeed\n');
      } else {
            console.log('Error in Retreiving NewsFeed\n');
      }
      res.render('newsFeed', {session : req.session.user_ApiToken, data: resp.data });
      
    })
    .catch((error) => {
      console.log("Error in Retreiving NewsFeed\n" + error.message);
      let resp = [];
      req.flash("error", "Sorry, Unable to Retreive NewsFeed Currently");
      res.render('newsFeed', {session : req.session.user_ApiToken, data: resp });
    });

};