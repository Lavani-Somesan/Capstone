const apiAdapter = require('../api/apiAdapter');
const API_URL = process.env.API_ENDPOINT ||'http://localhost:2000';
const api = apiAdapter(API_URL);
const { v4: uuidv4 } = require('uuid');



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
    console.log("Error in Retreiving Favorite Inventory\n" + error.message);
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
          console.log('Success in Retreiving Game Inventory\n');
          res.render('games', {session : req.session.user_ApiToken, data: resp.data });
      } else {
            console.log('Error in Retreiving Game Inventory\n');
            res.render('games', {session : req.session.user_ApiToken, data: resp.data });
      }
      
    })
    .catch((error) => {
      console.log("Error in Retreiving Game Inventory\n" + error.message);
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
        console.log('Success in Retreiving Merch Inventory\n');
        res.render('merchandise', {session : req.session.user_ApiToken, data: resp.data });
    } else {
          console.log('Error in Retreiving Merch Inventory\n');
          res.render('merchandise', {session : req.session.user_ApiToken, data: resp.data });
    }
    
  })
  .catch((error) => {
    console.log("Error in Retreiving Merch Inventory\n" + error.message);
    let resp = [];
    req.flash("error", "Unable to Retrieve Merch Inventory");
    res.render('merchandise', {session : req.session.user_ApiToken, data: resp });
  });
};


exports.getProduct = (req, res) => {
  let endPoint = API_URL + req.path;

  console.log("Posting to API\n");

  api.get(endPoint, req.query).then((response) => {
    const product = response.data;

    if(product) {
      console.log('Success in Product from Inventory\n');
      res.render('product', {session : req.session.user_ApiToken, data: product });
  } else {
        console.log('Error in Retreiving Product from Inventory\n');
        req.flash("error", "Error with Viewing Product");
        res.redirect('/home');
  }

  })
  .catch((error) => {
    console.log('Error in Retreiving Product from Inventory\n' + error.message);
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
      console.log("Error with Searching Functionality\n" + error.message);
      req.flash("error", "Unable to Search, Please Try Again");
      res.redirect("/home");
    });

};