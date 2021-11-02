
const apiAdapter = require('../api/apiAdapter');
const API_URL = 'http://localhost:2000';
const api = apiAdapter(API_URL);

const { session } = require('passport');
const { data } = require('jquery');
const express = require('express');


exports.createUser = (req, res) => {
    
    let randID = Math.floor((Math.random() * 10000) + 10000);
    let endPoint = API_URL + '/user' + req.path + `/${randID}`;
    
    console.log("Posting to API");
    
    api.post(endPoint, req.body).then(resp => {
        
        if(resp.data.responseID != null && !resp.data.report.includes("Error")) {
            console.log(`Success, Response ID: ${resp.data.responseID}`);
        } else {
            console.log(`Error, Response ID:  ${resp.data.responseID}`);
        }

        if(!resp.data.report.includes("Error")) {
            res.redirect("/login");
        } else {
            res.redirect("/account-creation");
        }
    })
    .catch(error => {
        console.log(`Request Failed: ${error.message}`);
        res.redirect("/create-account");
    });

    
};


exports.authentication = (req, res) => {
    let randID = Math.floor((Math.random() * 100000) + 10000);
    let endPoint = API_URL + `/user/authentication/${randID}`;
    var isAuthenticated = 0;

    console.log("\n Posting login data to API");

    api.post(endPoint, req.body).then(resp => {
        const userObj = resp.data.user
            
        if(resp.data.responseID != null && resp.data.report != null){
            console.log("User Service", req.path, "response", resp.data.report, resp.data.responseID); 
        } 

        if (Object.keys(userObj).length > 0) {
            req.session.user_ApiToken = userObj.apiToken; //Starts session
            req.session.user_ID = resp.data._id; 
            res.redirect("/home");
        }
        else {
            console.log("User Not Found, Error Logging in\n");
            res.redirect("/login"); 
        }   
    })
    .catch(err => {
        console.log("Error Logging in\n");
        res.redirect("/login");
    })
};