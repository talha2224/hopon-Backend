const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
    number:{type:String,required:true},
    otp:{type:Number,default:null},
    accountVerified:{type:Boolean,default:false}
}, { timestamps: true });

const otp = mongoose.model("OTP", otpSchema, "OTP");

module.exports = otp;
