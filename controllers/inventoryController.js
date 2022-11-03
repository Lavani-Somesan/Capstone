/*
 * inventoryController.js
 * Defines the Different Inventory Route Functionality 
 */

 apiAdapter = require('../api/apiAdapter');
const API_URL = process.env.API_ENDPOINT ||'http://localhost:2000';
const api = apiAdapter(API_URL);
const { v4: uuidv4 } = require('uuid');


/*
 * Function to get the Home Page 
 * Makes a get request to the API with the created endpoint URL. 
 * Awaits the response from the API and creates an object from the response data.
 * Renders home page regarless if there is data
 */
exports.getHomePage = (req, res) => {
  let endPoint = API_URL + req.path;
  
  console.log("Posting to API\n");
  
  api.get(endPoint).then((resp) => {

    const productObj = resp.data;

    if(productObj) {
        console.log('Success in Retrieving Favorite inventory\n');
    } else {
          console.log('Error in Retrieving Favorite inventory\n');
    }
    res.render('home', {session : req.session.user_ApiToken, data: resp.data });
  })
  .catch((error) => {
    console.log("Error in Retreiving Favorite Inventory\n" + error.message);
    let resp = [];
    res.render('home', {session : req.session.user_ApiToken, data: resp });
  });
}


/*
 * Function to get the Games Page 
 * Makes a get request to the API with the created endpoint URL. 
 * Awaits the response from the API and creates an object from the response data.
 * Renders Game page regarless if there is data 
 */
exports.getGamePage = (req, res) => {
    let endPoint = API_URL + req.path;
    
    console.log("Posting to API\n");
    
    api.get(endPoint).then((resp) => {

      const gameObj = resp.data;

      if(gameObj) {
          console.log('Success in Retreiving Game Inventory\n');
      } else {
            console.log('Error in Retreiving Game Inventory\n');
      }
      res.render('games', {session : req.session.user_ApiToken, data: resp.data });

    })
    .catch((error) => {
      console.log("Error in Retreiving Game Inventory\n" + error.message);
      let resp = [];
      req.flash("error", "Failed to Retreive Game Inventory");
      res.render('games', {session : req.session.user_ApiToken, data: resp });
    });
};


/*
 * Function to get the Merch Page 
 * Makes a get request to the API with the created endpoint URL. 
 * Awaits the response from the API and creates an object from the response data.
 * Renders Merch page regarless if there is data 
 */
exports.getMerchPage = (req, res) => {
  let endPoint = API_URL + req.path;
  
  console.log("Posting to API\n");
  
  api.get(endPoint).then((resp) => {

    const merchObj = resp.data;

    if(merchObj) {
        console.log('Success in Retreiving Merch Inventory\n');
    } else {
          console.log('Error in Retreiving Merch Inventory\n');
    }
    res.render('merchandise', {session : req.session.user_ApiToken, data: resp.data });
  })
  .catch((error) => {
    console.log("Error in Retreiving Merch Inventory\n" + error.message);
    let resp = [];
    req.flash("error", "Unable to Retrieve Merch Inventory");
    res.render('merchandise', {session : req.session.user_ApiToken, data: resp });
  });
};


/*
 * Function to get the Product Page 
 * Makes a get request to the API with the created endpoint URL. 
 * Awaits the response from the API and creates an object from the response data.
 * Renders Product page if product object contains data.
 * Else Redirects user to home page and flashes an error message in viewing product
 */
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


/*
 * Function to get the Search Results 
 * Makes a get request to the API with the created endpoint URL. 
 * Awaits the response from the API and creates an object from the response data.
 * Renders Search Results page with the data found and what the user entered in the search bar.
 * (Even if there is no data still renders the page and lets user no that no match was found)
 */
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