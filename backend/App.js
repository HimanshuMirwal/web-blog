const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const cors = require("cors");
var multer = require('multer')
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static('public'));


// const uri = "mongodb://127.0.0.1:27017/WebBlog";
const uri = "mongodb+srv://admin-himanshu:test123@cluster0.qewzz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(uri);
// MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true});



const TittleRoute = require("./routes/TittleRoute");
const place = require("./routes/Place");
const subTittle = require("./routes/subTittle");
const Feedback = require("./routes/FeedbackRoute");
const Admin = require("./routes/Admin");
const CodeCheck = require("./routes/CodeCheck");
const Password = require("./routes/PasswordRoute");
const About  = require("./routes/About");
app.use("/tittle", TittleRoute);
app.use("/place", place);
app.use("/subtittle", subTittle);
app.use("/feedback", Feedback);
app.use("/admin", Admin);
app.use("/code", CodeCheck);
app.use("/Password", Password);
app.use("/About",About);

app.get("/", (req, res)=>{
    res.send("<h1> WebBlog </h1>");
})
app.listen(process.env.PORT||8000, function (req, res) {
    console.log("Server started at port 8000.");
});