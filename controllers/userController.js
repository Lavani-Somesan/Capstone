
const apiAdapter = require('../api/apiAdapter');
const API_URL = 'http://localhost:2000';
const api = apiAdapter(API_URL);

const { data } = require('jquery');
const express = require('express');


exports.createUser = (req, res) => {
    
    let randID = Math.floor((Math.random() * 10000) + 10000);
    let endPoint = API_URL + '/user' + req.path + `/${randID}`;
    
    console.log("Posting to API");
    
    api.post(endPoint, req.body).then(resp => {
        
        if(resp.data.responseID != null && resp.data.report != null) {
            console.log(`Success, Response ID: ${resp.data.responseID}`);
        }
    })
    .catch(error => {
        console.log(`Request Failed: ${error.message}`);
        res.redirect("/create-account");
    });

    res.redirect("/login");
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
        if(userObj == 0) {
            console.log("Login Unsucessful\n");
            res.redirect("/login");
        } else {
            console.log("Login Success\n");
            res.redirect("/home");
        }
    })
    .catch(err => {
        console.log("Error Logging in\n");
        res.redirect("/login");
    })
};