const Route = require("express").Router();
var Code ;
const RanomNumberCheck = (val)=>{
    // console.log(val+" Random number");
    Code=val.toString();
}
Route.post("/sendcode", (req, res) => {
    // console.log(Code+" Random number");

   const CodeCheck= req.body.dataValue;
   console.log(Code);
    if(CodeCheck === Code){
        res.json("00015");
    }else{
        res.json("Error!")
    }
});
module.exports = Route;
module.exports.RanomNumberCheck=RanomNumberCheck;