const mongoose = require("mongoose")


const accountSchema = mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    phone_number:{type:String,required:true},
    licenseImage:{type:Array,default:null},
    insuranceImage:{type:Array,default:null},
    inspection:{type:Array,default:null},
    carPhotos:{type:Array,required:true}
},{timestamps:true})


const driverAccount = mongoose.model("driverAccount",accountSchema,"driverAccount")

module.exports = driverAccount