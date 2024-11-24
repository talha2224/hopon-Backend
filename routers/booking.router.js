const { createBooking, getBookingForDriver, acceptBooking, getActiveBooking, endRide } = require("../services/booking/booking.service")

const router = require("express").Router()


router.post("/booking",createBooking)
router.get("/single/:id",getBookingForDriver)
router.put("/update/:id",acceptBooking)
router.get("/info/:type/:id",getActiveBooking)
router.post("/end/:id",endRide)





module.exports = router