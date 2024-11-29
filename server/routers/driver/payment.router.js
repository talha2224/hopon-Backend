const { createPaymentIntent } = require("../../services/driver/payment.service")

const router = require("express").Router()


router.post("/create",createPaymentIntent)

module.exports = router
