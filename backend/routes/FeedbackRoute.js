const express = require("express");
const Route = express.Router();
const Feedback = require("../models/FeedbackModel");
const emailValidator = require('deep-email-validator');
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'himanshumirwal@gmail.com',
        pass: 'himanshu123'
    }
});

async function isEmailValid(email) {
    return emailValidator.validate(email)
}

Route.get("/getfeedback", (req, res) => {
    Feedback.find()
        .then(data => res.send(data))
        .catch(Err => res.redirect("http://localhost:3000?" + Err));
});

Route.post("/deletefeedback/:id", (req, res) => {
    const id = req.params.id
    Feedback.deleteOne({ _id: id })
        .then(val => res.json("deleted Successfully"))
        .catch(err => res.json(err))
})

Route.post("/replyfeedback", async function (req, res) {
    const EmailRecepient = req.body.EmailRecepient;
    const message = req.body.message;
    const NameOfRecepient = req.body.NameOfRecepient;
    const FeedbackMessages = req.body.FeedbackMessage;
    const { valid, reason, validators } = await isEmailValid(EmailRecepient);
    if (valid) {
        let mailOptions = {
            from: 'himanshumirwal@gmail.com',
            to: EmailRecepient,
            subject: "Admin Response",
            html: "<div className='row' style='heigth:500px; color:#345B63;background:#d4ecdd;padding:2% 5%;margin:auto'><h1>Hello "+NameOfRecepient+"</h1><hr></hr><p>Thank you so much for sharing your experience with Web Blog. Your feedback helps us improve our  service for everyone.<br></br><h3>Here is your Feedback, </h3> "+FeedbackMessages+"<br></br><h3>Admin Reply, </h3> "+message+"</p><p>Thanks again,<br></br><b>Web Blog</b></p></div>"
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.json("OK");
    }

    return res.status(400).send({
        message: "Please provide a valid email address.",
        reason: validators[reason].reason
    })
})

Route.post("/postfeedback", async function(req, res) {
    const Email = req.body.EmailFeedback;
    const FeedbackData = req.body.EmailDescription;
    const NameData = req.body.Name;
    const FeeedbackDataValue = new Feedback({
        Email: Email,
        FeedbackDescription: FeedbackData,
        Name: NameData
    });
    const { valid, reason, validators } = await isEmailValid(Email);

    FeeedbackDataValue.save()
        .then(() => {
            if (valid) {
                let mailOptions = {
                    from: 'himanshumirwal@gmail.com',
                    to: Email,
                    subject: "Thanks Message",
                    html: "<div className='row' style='heigth:500px; color:#345B63;background:#d4ecdd;padding:2% 5%;margin:auto'><h1>Hello "+NameData+"</h1><hr></hr><p>Thank you so much for sharing your experience with Web Blog. Your feedback helps us improve our  service for everyone.If you’d like to discuss how we could’ve made your experience better, please call us at +91 8816061632 or reply to this email. We look forward to hearing from you!</p><p>Thanks again,<br></br><b>Web Blog</b></p></div>"
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                return res.json("send Successfull!");
            }

            return res.status(400).send({
                message: "Please provide a valid email address.",
                reason: validators[reason].reason
            })
        })
        .catch(Err => res.redirect("http://localhost:3000?" + Err));
});

module.exports = Route;