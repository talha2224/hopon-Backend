const { createBooking, getBookingForDriver, acceptBooking } = require("../services/booking/booking.service")

const router = require("express").Router()


router.post("/booking",createBooking)
router.get("/single/:id",getBookingForDriver)
router.put("/update/:id",acceptBooking)





module.exports = router