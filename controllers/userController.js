
const apiAdapter = require('../api/apiAdapter');
const API_URL = 'http://localhost:2000';
const api = apiAdapter(API_URL);

const { data } = require('jquery');
const express = require('express');


exports.createUser = (req, res) => {
    
    let randID = Math.floor((Math.random() * 10000) + 10000);
    let endPoint = API_URL + '/user' + req.path + `/${randID}`;

    console.log(endPoint);

    res.redirect("/login");
}