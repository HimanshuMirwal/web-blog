const express = require('express');
var ObjectId = require('mongodb').ObjectID;
const Tittle = require("../models/SubTittleWithDescription");
const app = express;
const Router = app.Router();

// respond with "hello world" when a GET request is made to the homepage
Router.route('/getplace').get(function (req, res) {
  // res.send('<h1>hello world</h1>');
  Tittle.find().then(user => res.json(user)).catch(Error => res.send("Error" + Error));
});
Router.route('/getplace/:ID').get(function (req, res) {
  // console.log(req.params);
  const len = req.params.ID.length;
  const data = req.params.ID.substring(1, len);
  Tittle.findById(new ObjectId(data)).then(user => res.send(user)).catch(Error=>res.send("Error"+Error));
});
Router.route('/update').post(function (req, res) {
  const data = req.body.id;
  const subject = req.body.TittleName;
  const state = req.body.SubTittleName;
  const city = req.body.city;
  const TourPlace = req.body.TourPlace;
  const TourPlaceDescription = req.body.TourPlaceDescription;
  Tittle.findById(data).then(exercise => {
    exercise.TittleName= subject,
    exercise.subtittleName= state,
    exercise.city= city,
    exercise.PlaceForTour= TourPlace,
    exercise.PlaceTourExplaination= TourPlaceDescription
    exercise.save().then(() => res.json("updated!")).catch((err) => res.status(400).json("error" + err));
    })
  }
);
Router.route("/add").post((req, res) => {
  // console.log(req.body);
  const subject = req.body.TittleName;
  const state = req.body.state;
  const city = req.body.city;
  const TourPlace = req.body.TourPlace;
  const TourPlaceDescription = req.body.TourPlaceDescription;
  const TittleLocal = new Tittle({
    TittleName: subject,
    subtittleName: state,
    city: city,
    PlaceForTour: TourPlace,
    PlaceTourExplaination: TourPlaceDescription
  });
  TittleLocal.save().then(() => res.json("Added!")).catch(Err => res.status(400).json("Error: " + Err));
});
Router.route('/delete/:ID').post(function (req, res) {
  // console.log();

  Tittle.deleteOne({_id: req.params.ID}).then(() => res.json("Deleted")).catch(Error=>res.send("Error"+Error));
});
module.exports = Router;