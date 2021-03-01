const express = require('express');
var ObjectId = require('mongodb').ObjectID;
const Tittle = require("../models/SubTittleWithDescription");
const app = express;
const Router = app.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public/Photos')
},
filename: function (req, file, cb) {
  cb(null, Math.floor(Math.random(100)*1000000)+file.originalname);
}
});
var upload = multer({ storage: storage }).array('file')


// respond with "hello world" when a GET request is made to the homepage
Router.route('/getplace').get(function (req, res) {
  // res.send('<h1>hello world</h1>');
  Tittle.find().then((user )=>{ res.json(user);}).catch(Error => res.send("Error" + Error));
  // console.log()
});
Router.route('/getplaceImage/:Image').get(function (req, res) {
  // res.send('<h1>hello world</h1>');
  console.log(req.params.Image)
  res.sendFile(process.cwd()+"/public/Photos/"+req.params.Image);
  // Tittle.find().then((user )=>{ res.json(user);}).catch(Error => res.send("Error" + Error));
  // console.log(process.cwd()+"\publi\919004.jpg")
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
// Router.route('/updateSubtitle/:Name').post(function (req, res) {
//   const data = req.params.Name;
//   const Data=Tittle.find().then(exercise => {
//     // exercise.subtittleName= req.params.Name
//     console.log(exercise.subtittleName)
//     // exercise.save().then(() => res.json("updated! Place")).catch((err) => res.status(400).json("error" + err));
//     }
//     )
//   Tittle.find({ subtittleName: data }).snapshot().forEach((doc) => {
//     doc.subtittleName = req.body.DataToSend;
//     Tittle.save(doc);
//   }).then(()=>res.json("Updated! Place")).catch(Err=>res.json(Err));
//   }
// );
Router.route("/add").post((req, res) => {
  
  upload(req, res, function (err) {
  console.log(req.body);
  console.log(req.files);
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
    PlaceTourExplaination: TourPlaceDescription,
    filename:req.files
  });
  TittleLocal.save().then(() => res.json("Added!")).catch(Err => res.status(400).json("Error: " + Err));
  })
  });
Router.route('/delete/:ID').post(function (req, res) {
  // console.log();
  Tittle.deleteOne({_id: req.params.ID}).then(() => res.json("Deleted")).catch(Error=>res.send("Error"+Error));
});
module.exports = Router;