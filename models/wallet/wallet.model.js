const mongoose = require("mongoose")


const walletSchema = mongoose.Schema({
    riderId:{type:mongoose.Schema.Types.ObjectId,ref:"riderAccount",default:null},
    driverId:{type:mongoose.Schema.Types.ObjectId,ref:"driverAccount",default:null},
    amount:{type:Number},
    deposit:{type:Boolean,required:true},
    message:{type:String,required:true}
},{timestamps:true})


const Wallet = mongoose.model("Wallet",walletSchema,"Wallet")

module.exports = Wallet