const express = require('express');
const Tittle = require("../models/TittleModel");
const app = express;
const Router = app.Router();

// respond with "hello world" when a GET request is made to the homepage
Router.route('/gettitle').get(function (req, res) {
  Tittle.find().then(user => res.json(user)).catch(Error=>res.send("Error"+Error));
});
Router.route("/send").post((req, res)=>{
  const TittleName = req.body.TittleName;
  const TittleLocal = new Tittle({TittleName:TittleName});
  TittleLocal.save().then(()=> res.json("Added!")).catch(Err => res.status(400).json("Error: "+Err));
});
module.exports = Router;