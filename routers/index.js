const combineRouter = require("express").Router()

const riderAccountRoutes = require("./rider/account.router")
const driverAccountRoutes = require("./driver/account.router")
const notificationRoutes = require("./notification.router")
const bookingRoutes = require("./booking.router")
const paymentRoutes = require("./driver/payment.router")
const WalletRoutes = require("./wallet.router")
const chat = require("./chat/chat.router")
const message = require("./chat/message.router")
const places = require("./rider/places.router")


combineRouter.use("/rider",riderAccountRoutes)
combineRouter.use("/driver",driverAccountRoutes)
combineRouter.use("/notifications",notificationRoutes)
combineRouter.use("/ride",bookingRoutes)
combineRouter.use("/payment",paymentRoutes)
combineRouter.use("/wallet",WalletRoutes)
combineRouter.use("/chat",chat)
combineRouter.use("/message",message)
combineRouter.use("/place",places)
combineRouter.use("/otp",require("./driver/otp.router"))





module.exports = combineRouter