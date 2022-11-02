const apiAdapter = require('../api/apiAdapter');
const API_URL = process.env.API_ENDPOINT ||'http://localhost:2000';
const api = apiAdapter(API_URL);


exports.getHomePage = (req, res) => {
  let endPoint = API_URL + req.path;
  
  console.log("Posting to API\n");
  
  api.get(endPoint).then((resp) => {

    const productObj = resp.data;

    if(productObj) {
        console.log('Success in retreiving Favorite inventory\n');
        res.render('home', {session : req.session.user_ApiToken, data: resp.data });
    } else {
          console.log('Error in retreiving Favorite inventory\n');
          res.render('home', {session : req.session.user_ApiToken, data: resp.data });
    }
    
  })
  .catch((error) => {
    console.log("Error in retreiving Favorite inventory\n");
    let resp = [];
    res.render('home', {session : req.session.user_ApiToken, data: resp });
  });
}



exports.getGamePage = (req, res) => {
    let endPoint = API_URL + req.path;
    
    console.log("Posting to API\n");
    
    api.get(endPoint).then((resp) => {

      const gameObj = resp.data;

      if(gameObj) {
          console.log('Success in retreiving game inventory\n');
          res.render('games', {session : req.session.user_ApiToken, data: resp.data });
      } else {
            console.log('Error in retreiving game inventory\n');
            res.render('games', {session : req.session.user_ApiToken, data: resp.data });
      }
      
    })
    .catch((error) => {
      console.log("Error in retreiving game inventory\n");
      let resp = [];
      req.flash("error", "Failed to Retreive Game Inventory");
      res.render('games', {session : req.session.user_ApiToken, data: resp });
    });
};


exports.getMerchPage = (req, res) => {
  let endPoint = API_URL + req.path;
  
  console.log("Posting to API\n");
  
  api.get(endPoint).then((resp) => {

    const merchObj = resp.data;

    if(merchObj) {
        console.log('Success in retreiving Merch inventory\n');
        res.render('merchandise', {session : req.session.user_ApiToken, data: resp.data });
    } else {
          console.log('Error in retreiving Merch inventory\n');
          res.render('merchandise', {session : req.session.user_ApiToken, data: resp.data });
    }
    
  })
  .catch((error) => {
    console.log("Error in retreiving Merch inventory\n");
    let resp = [];
    req.flash("error", "Failed to Retreive Merch Inventory");
    res.render('merchandise', {session : req.session.user_ApiToken, data: resp });
  });
};


exports.getProduct = (req, res) => {
  let endPoint = API_URL + req.path;

  console.log("Posting to API\n");

  api.get(endPoint, req.query).then((response) => {
    const product = response.data;

    res.render('product', {session : req.session.user_ApiToken, data: product });

  })
  .catch((error) => {
    req.flash("error", "Error with Viewing Product");
    res.redirect("/home");
  });

};


exports.searchInventory = (req, res) => {
  //let searchParam = req.body.search.split(" ").join("-");
  let endPoint = API_URL + req.path + req.body.search;

  console.log("Posting to API\n");

  api.get(endPoint, req.query).then((response) => {
      const searchObj = response.data;

      res.render('searchResults', {session : req.session.user_ApiToken, data: searchObj, param: req.body.search });

    })
    .catch((error) => {
      req.flash("error", "Error with Search Functionality");
      res.redirect("/home");
    });

};