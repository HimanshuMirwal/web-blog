const Route = require("express").Router();
const nodemailer = require("nodemailer");
const RandomFunctionCall = require("./CodeCheck");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kartik0015mirwal@gmail.com',
        pass: 'kartik#123'
    }
});

Route.post("/get", (req, res) => {
    const IDValue = req.body.ID;
    const PassValue = req.body.Pass;
    const Random = Math.floor(Math.random() * 1000);
    console.log(Random);
    RandomFunctionCall.RanomNumberCheck(Random);

    if (IDValue === "000001500000" && PassValue === "Web-Blog-Password") {
        res.json("0015");
        let mailOptions = {
            from: 'kartik0015mirwal@gmail.com',
            to: 'dadat66910@bulkbye.com',
            subject: 'Check Pass',
            html: "<h1 style='color:'red''>CODE is </hr>" + Random + "</h1>"
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }else{
        res.json("Error");
    }
});
module.exports = Route;