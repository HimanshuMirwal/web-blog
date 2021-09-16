const Route = require("express").Router();
const nodemailer = require("nodemailer");
const PasswordModel = require("../models/PasswordModel");
const RandomFunctionCall = require("./CodeCheck");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD
    }
});
Route.post("/get", (req, res) => {
    const IDValue = req.body.ID;
    const PassValue = req.body.Pass;
    const Random = Math.floor(Math.random() * 1000);
    console.log(Random);
    // return ;
    RandomFunctionCall.RanomNumberCheck(Random);
    PasswordModel.findOne({ idAdmin: IDValue })
        .then(valServer => {
            console.log(valServer);
            if (IDValue === valServer.idAdmin && PassValue === valServer.passAdmin) {
                res.json("0015");
                let mailOptions = {
                    from: process.env.ADMIN_EMAIL,
                    to: process.env.ADMIN_EMAIL_Second,
                    subject: 'Check Pass',
                    html: "<div style='background:#FFE194;height:400px;text-align:center;padding:10%'><h1 style='color:#FFB319'>Hello Admin</h1><hr style='color:#FFB319;font-weight:bolder'></hr><br></br><h3 style='color:#22577A'>Your Code is "+Random + "</h3></div>"
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            } else {
                res.json("Error value donot match");
            }
        }).catch(err=>res.json("Error value donot match"))
});
module.exports = Route;