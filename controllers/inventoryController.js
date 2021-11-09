const apiAdapter = require('../api/apiAdapter');
const API_URL = 'http://localhost:2000';
const api = apiAdapter(API_URL);

const { session } = require('passport');
const { data } = require('jquery');
const express = require('express');


exports.getGamePage = (req, res) => {

    let endPoint = API_URL + '/games';
    
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
      res.send("Games not available");
    });
};