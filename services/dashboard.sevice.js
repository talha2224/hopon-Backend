const Booking = require("../models/booking/booking.model");
const driverAccount = require("../models/driver/account.model")
const riderAccount = require("../models/rider/account.model")



const dashboardData = async (req, res) => {
  try {
    let totalRiders = await riderAccount.find()
    let totalDrivers = await driverAccount.find()
    let totalBookings = await Booking.find({}).populate("rider").populate("driver")
    let completedBookings = await Booking.find({ status: "Completed" }).populate("rider").populate("driver")
    return res.status(200).json({ data: { totalRiders: totalRiders?.length, totalDrivers: totalDrivers?.length, totalBookings: totalBookings.length, completedBookings: completedBookings?.length, totalBookingsData: totalBookings, completedBookingsData: completedBookings, totalDriversData: totalDrivers }, msg: "" });
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = { dashboardData }