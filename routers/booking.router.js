const { createBooking } = require("../services/booking/booking.service")

const router = require("express").Router()


router.post("/booking",createBooking)




module.exports = router