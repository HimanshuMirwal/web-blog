const Mongoose = require("mongoose");

const FeedbackSchema = new Mongoose.Schema(
    {
        Email : {
            type:String,
            required:true
        },
        FeedbackDescription:{
            type:String,
            required:true
        },
        Name:{
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
);
const FeedbackModel =  Mongoose.model("Feedbackmodel",FeedbackSchema);

module.exports = FeedbackModel;