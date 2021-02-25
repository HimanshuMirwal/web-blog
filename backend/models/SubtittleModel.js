const Mongoose = require("mongoose");
const TittleSchema = new Mongoose.Schema({
  TittleName:{type: String, required : true,},
  subtittleName:{type: String, required : true,},
},{
    timestamps:true
});
const TittleModels = Mongoose.model('Subtittle', TittleSchema);
module.exports = TittleModels;