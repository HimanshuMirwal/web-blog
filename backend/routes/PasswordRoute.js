const PasswordModel = require("../models/PasswordModel");
const Route = require("./CodeCheck");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD
    }
});

Route.get("/getPassword",(req ,res)=>{
    PasswordModel.find()
        .then(val => {
            res.json(val)
        }).catch(err => {
            res.send(err)
        })
})

Route.post("/UpdatePassword",async function(req ,res){
 const  SERVERID= req.body.SERVERID;
 const  ID= req.body.ID;
 const  PASS= req.body.PASS;
 const Obj = SERVERID;
PasswordModel.findById(Obj)
        .then(val => {
                val.idAdmin=ID,
                val.passAdmin=PASS
                // console.log(val)
                val.save()
                .then(()=>{
                    let mailOptions = {
                        from: process.env.ADMIN_EMAIL,
                        to: process.env.ADMIN_EMAIL_Second,
                        subject: 'Password Changed',
                        html: "<div style='background:#FFE194;height:400px;text-align:center;padding:5%'><h1 style='color:#FFB319'>Hello Admin</h1><hr style='color:#FFB319;font-weight:bolder'></hr><br></br><h3 style='color:#22577A'>Your Id and Password has been changed, your new ID is "+ID+" and Password is "+ PASS+ "</h3></div>"
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.json("Email is correct and Data Updated")
                })
                .catch(Err=>res.sendStatus(400).json(Err))
        }).catch(err => {
            res.send(err)
        })
})

Route.get("/sendpasswordtome",(req,res)=>{
    PasswordModel.find()
        .then(val => {
                    let mailOptions = {
                        from: process.env.ADMIN_EMAIL,
                        to: process.env.ADMIN_EMAIL_Second,
                        subject: 'Login Credentials',
                        html: "<div style='background:#FFE194;height:400px;text-align:center;padding:5%'><h1 style='color:#FFB319'>Hello Admin</h1><hr style='color:#FFB319;font-weight:bolder'></hr><br></br> your ID is <h3 style='color:#22577A'>"+val[0].idAdmin+"</h3> and Password is <h3 style='color:#22577A'>"+ val[0].passAdmin+ "</h3></div>"
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    })
        }).catch(err => {
            res.send(err)
        })
})
module.exports = Route;