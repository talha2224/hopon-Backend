const combineRouter = require("express").Router()



combineRouter.use("/rider",require("./rider/account.router"))
combineRouter.use("/driver",require("./driver/account.router"))
combineRouter.use("/admin",require("./admin.router"))
combineRouter.use("/notifications",require("./notification.router"))
combineRouter.use("/ride",require("./booking.router"))
combineRouter.use("/payment",require("./driver/payment.router"))
combineRouter.use("/wallet",require("./wallet.router"))
combineRouter.use("/chat",require("./chat/chat.router"))
combineRouter.use("/message",require("./chat/message.router"))
combineRouter.use("/place",require("./rider/places.router"))
combineRouter.use("/otp",require("./driver/otp.router"))
combineRouter.use("/dashboard",require("./dashboard.router"))
combineRouter.use("/price",require("./price.router"))






module.exports = combineRouter