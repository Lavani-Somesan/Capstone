
const apiAdapter = require('../api/apiAdapter');
const API_URL = 'http://localhost:2000';
const api = apiAdapter(API_URL);

const { data } = require('jquery');
const express = require('express');


exports.createUser = (req, res) => {
    
    let randID = Math.floor((Math.random() * 10000) + 10000);
    let endPoint = API_URL + '/user' + req.path + `/${randID}`;
    
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
}