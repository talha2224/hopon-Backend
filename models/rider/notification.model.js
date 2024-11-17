const mongoose = require("mongoose")


const notificationSchema = mongoose.Schema({
    role:{type:String,required:true},
    riderId:{type:mongoose.Schema.Types.ObjectId,ref:"riderAccount",default:null},
    driverId:{type:mongoose.Schema.Types.ObjectId,ref:"driverAccount",default:null},
    title:{type:String,required:true},
    description:{type:String,required:true},
    error:{type:Boolean,default:false},
},{timestamps:true})


const Notification = mongoose.model("Notification",notificationSchema,"Notification")

module.exports = Notification