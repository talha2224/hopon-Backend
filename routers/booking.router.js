const { createBooking, getBookingForDriver, acceptBooking, getActiveBooking, endRide, cancellBooking } = require("../services/booking/booking.service")

const router = require("express").Router()


router.post("/booking",createBooking)
router.get("/single/:id",getBookingForDriver)
router.put("/update/:id",acceptBooking)
router.get("/info/:type/:id",getActiveBooking)
router.get("/cancel/:type/:id",cancellBooking)
router.post("/end/:id",endRide)





module.exports = router