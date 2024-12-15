const {createChat, getSingleChat, getRiderAllChats, getDriverAllChats } = require("../../services/chat/chat.service")

const router = require("express").Router()



router.post("/create",createChat)
router.get("/rider/all/:id",getRiderAllChats)
router.get("/driver/all/:id",getDriverAllChats)
router.get("/single/:id",getSingleChat)




module.exports = router


