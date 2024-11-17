const combineRouter = require("express").Router()

const riderAccountRoutes = require("./rider/account.router")
const driverAccountRoutes = require("./driver/account.router")
const notificationRoutes = require("./notification.router")
const bookingRoutes = require("./booking.router")

combineRouter.use("/rider",riderAccountRoutes)
combineRouter.use("/driver",driverAccountRoutes)
combineRouter.use("/notifications",notificationRoutes)
combineRouter.use("/ride",bookingRoutes)




module.exports = combineRouter