const mongoose = require("mongoose")


const accountSchema = mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    phone_number:{type:String,required:true},
    prefference:{type:String,required:true},
},{timestamps:true})


const riderAccount = mongoose.model("riderAccount",accountSchema,"riderAccount")

module.exports = riderAccount



