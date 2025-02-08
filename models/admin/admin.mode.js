const mongoose = require("mongoose")


const accountSchema = mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
},{timestamps:true})


const AdminModel = mongoose.model("Admin",accountSchema,"Admin")

module.exports = AdminModel



