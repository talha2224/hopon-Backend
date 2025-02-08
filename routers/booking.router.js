const { createBooking, getBookingForDriver, acceptBooking, getActiveBooking, endRide, cancellBooking, getCancelledBooking, getCompletedBooking, getBookingById, getAllBookings } = require("../services/booking/booking.service")

const router = require("express").Router()


router.post("/booking",createBooking)
router.get("/single/:id",getBookingForDriver)
router.get("/id/:id",getBookingById)
router.put("/update/:id",acceptBooking)
router.get("/info/:type/:id",getActiveBooking)
router.get("/cancel/:type/:id",cancellBooking)
router.get("/get/cancel/:type/:id",getCancelledBooking)
router.get("/get/completed/:type/:id",getCompletedBooking)
router.post("/end/:id",endRide)
router.get("/all",getAllBookings)





module.exports = router