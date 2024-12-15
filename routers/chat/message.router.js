const { sendMessage, getAllMessages } = require("../../services/chat/message.service")

const router = require("express").Router()



router.post("/send",sendMessage)
router.get("/get/:id",getAllMessages)



module.exports = router


