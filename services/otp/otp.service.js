const otpModel = require("../../models/otp/otp.model");
const { generatePin, sendOtp } = require("../../utils/function");

const resendOtp = async (req, res) => {
    try {
        let { number } = req.params
        let user = await otpModel.findOne({ number })
        console.log(user,'user')
        let pin = generatePin()
        await sendOtp(number, pin);
        if(!user){
            await otpModel.create({number:number,otp:pin}, { new: true })
            return res.status(200).json({ data: null, msg: "OTP send sucessfully", code: 200 })
        }
        else{
            await otpModel.findByIdAndUpdate(user?._id,{otp: pin }, { new: true })
            return res.status(200).json({ data: null, msg: "OTP send sucessfully", code: 200 })
        }

    }
    catch (error) {
        console.log(error)
    }
}
const verifyOtp = async (req, res) => {
    try {
        let { number, otp } = req.body
        let user = await otpModel.findOne({ number: number })
        console.log(user,'user')
        console.log(otp)
        if (otp == user?.otp) {
            await otpModel.findByIdAndUpdate(user?._id, { otp: null, accountVerified: true }, { new: true })
            return res.status(200).json({ data: user, msg: "Account Verified", code: 200 })
        }
        else {
            return res.status(403).json({ data: user, msg: "Invalid Otp", code: 403 })
        }

    }
    catch (error) {
        console.log(error)
    }
}


module.exports = {resendOtp,verifyOtp}