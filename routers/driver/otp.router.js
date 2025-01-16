const { createPaymentIntent } = require("../../services/driver/payment.service")
const { resendOtp, verifyOtp } = require("../../services/otp/otp.service")

const router = require("express").Router()


router.post("/send/:number",resendOtp)
router.post("/verify",verifyOtp)

module.exports = router
