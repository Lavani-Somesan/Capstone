const apiAdapter = require('../api/apiAdapter');
const API_URL = 'http://localhost:2000';
const api = apiAdapter(API_URL);



exports.getNewsFeedPage = (req, res) => {
    let endPoint = API_URL + req.path;
    
    console.log("Posting to API\n");
    
    api.get(endPoint).then((resp) => {

      const feedObj = resp.data;

      if(feedObj) {
          console.log('Success in retreiving newsFeed\n');
          res.render('newsFeed', {session : req.session.user_ApiToken, data: resp.data });
      } else {
            console.log('Error in retreiving newsFeed\n');
            res.render('newsFeed', {session : req.session.user_ApiToken, data: resp.data });
      }
      
    })
    .catch((error) => {
      console.log("Error in retreiving newsFeed\n");
      let resp = [];
      req.flash("error", "Sorry, Unable to Retreive NewsFeed Currently");
      res.render('newsFeed', {session : req.session.user_ApiToken, data: resp });
    });


};