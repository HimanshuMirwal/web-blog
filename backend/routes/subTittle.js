const express = require('express');
const Tittle = require("../models/SubtittleModel");
const app = express;
const Router = app.Router();

// respond with "hello world" when a GET request is made to the homepage
Router.route('/getsubtitle').get(function (req, res) {
  // res.send('<h1>hello world</h1>');
  Tittle.find().then(user => res.json(user)).catch(Error=>res.send("Error"+Error));
});
Router.route('/getsubtitle/:Data').get(function (req, res) {
  // res.send('<h1>hello world</h1>');
  const data = req.params.Data; 
  Tittle.findOne({subtittleName:data}).then(user => res.json(user)).catch(Error=>res.send("Error"+Error));
});
Router.route("/submit").post((req, res)=>{
    const subject = req.body.TittleName;
  const state = req.body.state;
  // console.log(req.body);
  const TittleLocal = new Tittle({
    TittleName:subject,
    subtittleName:state
   });
  TittleLocal.save().then(()=> res.json("Added!")).catch(Err => res.status(400).json("Error: "+Err));
    console.log(req.body);
});
module.exports = Router;