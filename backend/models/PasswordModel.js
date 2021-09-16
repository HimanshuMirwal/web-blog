const Mongoose = require("mongoose");

const PasswordSchema = new Mongoose.Schema({
    emailAdmin:{
        type:String,
        required:true
    },
    EmailPassAdmin:{
        type:String,
        required:true
    },
    idAdmin :{
        type:String,
        required:true
    },
    passAdmin:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const PasswordModel = Mongoose.model("PasswordModel", PasswordSchema);
module.exports = PasswordModel;