const express = require("express");
const Route = express.Router();
const Feedback = require("../models/FeedbackModel");

Route.get("/getfeedback",(req, res)=>{
    res.send("<h1>Hello Feedback</h1>");
});

Route.post("/postfeedback",(req, res)=>{
    console.log(req.body);
    const Email = req.body.EmailFeedback;
    const FeedbackData = req.body.EmailDescription;
    const FeeedbackDataValue = new Feedback({
        Email : Email,
        FeedbackDescription:FeedbackData
    });
    FeeedbackDataValue.save().then(() => res.json("Added!")).catch(Err => res.redirect("http://localhost:3000?"+ Err));
});

module.exports = Route;