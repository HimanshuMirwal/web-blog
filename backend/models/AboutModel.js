const { Timestamp } = require("bson");
const Mongoose = require("mongoose");

const Schema = new Mongoose.Schema({
    about:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},
{ 
    Timestamp: true 
})
const AboutModel = Mongoose.model("About",Schema);

module.exports=AboutModel;