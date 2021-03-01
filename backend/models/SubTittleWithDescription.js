const Mongoose = require("mongoose");
const DescriptionSchema = new Mongoose.Schema({
    TittleName:{type: String, required : true,},
    subtittleName:{type: String, required : true,},
    city:{type: String, required : true,},
    PlaceForTour:{type: String, required : true,},
    PlaceTourExplaination:{type: String, required : true,},
    filename:{type: Array, required : true,},
},{
    timestamps:true
});
const DescriptionModel = Mongoose.model('DescriptionModel', DescriptionSchema);
module.exports = DescriptionModel;