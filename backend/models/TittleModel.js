const Mongoose = require("mongoose");
const TittleSchema = new Mongoose.Schema({
    TittleName:{
       type: String,
       required : true,
       unique:true
    },
},{
    timestamps:true
});
const TittleModels = Mongoose.model('Tittle', TittleSchema);
module.exports = TittleModels;