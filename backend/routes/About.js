const AboutModel = require("../models/AboutModel");
const Route = require("./CodeCheck");


Route.get("/getabout",function(req, res){
    AboutModel.find()
    .then(val=>res.json(val[0]))
    .catch(Err=>res.json("Error "+Err))
})

Route.post("/postabout",function(req, res){
    const about = req.body.About;
    const IDS = req.body.ID;
    const image = req.body.image;
    AboutModel.findById(IDS)
    .then(val=>{
        val.about=about,
        val.image = image
        val.save().then(()=>res.json("Updated")).catch(Err=>res.json("Error "+Err))
    })
    .catch(Err=>res.json("Error "+Err))
})

module.exports = Route;