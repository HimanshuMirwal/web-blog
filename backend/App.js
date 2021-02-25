const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); 


const uri = "mongodb://127.0.0.1:27017/WebBlog";

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

app.use("/tittle", TittleRoute);
app.use("/place",place);
app.use("/subtittle",subTittle);
app.use("/feedback",Feedback);
app.use("/admin",Admin);
app.use("/code",CodeCheck);

app.listen(8000, function(req, res){
    console.log("Server started at port 8000.");
});