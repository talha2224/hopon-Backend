const { createAccount, getAccount, getAccountByPhone } = require("../../services/rider/account.service")

const router = require("express").Router()


router.post("/register",createAccount)
router.get("/info/:id",getAccount)
router.get("/phone/:phone",getAccountByPhone)




module.exports = router