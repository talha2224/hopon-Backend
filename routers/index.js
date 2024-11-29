const combineRouter = require("express").Router()

const riderAccountRoutes = require("./rider/account.router")
const driverAccountRoutes = require("./driver/account.router")
const notificationRoutes = require("./notification.router")
const bookingRoutes = require("./booking.router")
const paymentRoutes = require("./driver/payment.router")
const WalletRoutes = require("./wallet.router")

combineRouter.use("/rider",riderAccountRoutes)
combineRouter.use("/driver",driverAccountRoutes)
combineRouter.use("/notifications",notificationRoutes)
combineRouter.use("/ride",bookingRoutes)
combineRouter.use("/payment",paymentRoutes)
combineRouter.use("/wallet",WalletRoutes)





module.exports = combineRouter