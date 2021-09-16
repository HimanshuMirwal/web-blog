const express = require('express');
const Tittle = require("../models/SubtittleModel");
const SubTittleWithDiscription = require("../models/SubTittleWithDescription");

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
Router.route("/update/:ID").post((req, res)=>{
  const ValueToUpdate = req.body.SubTitleValue;
  Tittle.findById(req.params.ID).then((Data)=>{
    Data.subtittleName=ValueToUpdate
    Data.save().then(() => res.json("updated!")).catch((err) => res.status(400).json("error" + err));
  })
  
});
Router.route("/delete/:ID").post((req, res)=>{
  const NameOfSubtitle = req.body.NameOfSubtitle;
  SubTittleWithDiscription.deleteMany({subtittleName:NameOfSubtitle})
  .then(()=>res.json("place also deleted."))
  .catch(err=>res.status(400).json("Error:"+err));
  Tittle.deleteOne({_id: req.params.ID})
  .then(()=> res.json("deleted!"))
  .catch(Err => res.status(400).json("Error: "+Err));
});
module.exports = Router;